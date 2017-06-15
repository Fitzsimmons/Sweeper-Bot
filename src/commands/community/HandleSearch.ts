import { Command, GuildStorage } from 'yamdbf';
import { GuildMember, Message, RichEmbed, User } from 'discord.js';
import Handle from '../../util/Handle';
import Profile from '../../util/Profile';
import * as fuzzy from 'fuzzy';

export default class HandleSearch extends Command {
	public constructor()	{
		super({
			name: 'hs',
			desc: 'Handle Search',
			usage: '<prefix>hs <Argument>',
			info: 'Argument information below...\u000d\u000d' +
			'@mention : Find a user\'s Handle via Discord @mention\u000d' +
			'username : Find a user\'s Handle via Discord username',
			group: 'search',
			guildOnly: true
		});
	}

	public async action(message: Message, args: Array<string>): Promise<any> {
		// start typing
		message.channel.startTyping();

		// no user specified
		if (!args[0]) {
			message.channel.send('Please provide a user to search for.');
			return message.channel.stopTyping();
		}

		// if there was an attempt, args[0] was too short
		if (args[0] && args[0].length < 3) {
			message.channel.send('Please provide more letters for your search.');
			return message.channel.stopTyping();
		}

		// grab the storage
		const guildStorage: GuildStorage = this.client.storage.guilds.get(message.guild.id);

		// create error variables
		let error: Boolean = false;
		let errorMessage: string = '';

		// if @mention was used
		if (message.mentions.users.size === 1) {
			// variable declaration
			let profile: Profile = await guildStorage.get(message.mentions.users.first().id);
			let tags: string = '';
			let info: string = '';

			// sort, active first
			profile.handles.sort((a: Handle, b: Handle) => { return (a.active === b.active) ? 0 : a.active ? -1 : 1; });

			// get active Handle
			const index: number = profile.handles.findIndex(a => a.active === true);

			// build output for tags and info
			profile.handles.forEach((el: Handle) => {
				tags += `\`${el.tag}\`\n`;
				info += `\`${el.platform.toUpperCase()}\`\n`;
			});

			// build display output
			const embed: RichEmbed = new RichEmbed()
				.setColor(Profile.getEmbedColor(profile.handles[index].platform))
				.setAuthor(message.mentions.users.first().username, message.mentions.users.first().avatarURL)
				.addField('Handle', tags, true)
				.addField('Account Info', info, true)
				.setFooter(`${message.mentions.users.first().username}'s current main handle is ${profile.handles[index].tag} on ${profile.handles[index].platform.toUpperCase()}.`);

			// display output
			message.channel.send({ embed: embed });
			return message.channel.stopTyping();
		}

		if (message.mentions.users.size > 1) {
			message.channel.send('Please specify only one user.');
			return message.channel.stopTyping();
		}

		if (args[0]) {
			// map users
			const users: Array<User> = message.guild.members.map((member: GuildMember) => member.user);

			// search for user
			let options: any = { extract: (el: User) => { return el.username; } };
			let results: any = fuzzy.filter(args[0].toString(), users, options);

			// user found
			if (results.length === 1) {
				// create user variables
				let user: User = results[0].original;
				let profile: Profile = await guildStorage.get(user.id);
				let tags: string = '';
				let info: string = '';

				// null checking
				if (!profile) {
					message.channel.send(`**${user.username}** is not registered with me.`);
					return message.channel.stopTyping();
				}

				// sort, active first
				profile.handles.sort((a: Handle, b: Handle) => { return (a.active === b.active) ? 0 : a.active ? -1 : 1; });

				// get active Handle
				const index: number = profile.handles.findIndex(a => a.active === true);

				// build output for tags and info
				profile.handles.forEach((el: Handle) => {
					tags += `\`${el.tag}\`\n`;
					info += `\`${el.platform.toUpperCase()}\`\n`;
				});

				// build display output
				const embed: RichEmbed = new RichEmbed()
					.setColor(Profile.getEmbedColor(profile.handles[index].platform))
					.setAuthor(user.username, user.avatarURL)
					.addField('Handle', tags, true)
					.addField('Account Info', info, true)
					.setFooter(`${message.mentions.users.first().username}'s current main handle is ${profile.handles[index].tag} on ${profile.handles[index].platform.toUpperCase()}.`);

				// display output
				message.channel.send({ embed: embed });
				return message.channel.stopTyping();
			} else {
				// be more specfic
				message.channel.send(`**${results.length}** users found.  Please be more specific.`);
				return message.channel.stopTyping();
			}
		}
	}
}
