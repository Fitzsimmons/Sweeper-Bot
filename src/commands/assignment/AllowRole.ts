import { Client, Command, GuildStorage } from 'yamdbf';
import { Message, RichEmbed, Role } from 'discord.js';
import * as fuzzy from 'fuzzy';
import Assignment from '../../util/Assignment';
import Constants from '../../util/Constants';

export default class AllowRole extends Command<Client> {
	public constructor(bot: Client) {
		super(bot, {
			name: 'allow',
			aliases: ['a'],
			description: 'Allow Role',
			usage: '<prefix>allow <Argument>\u000d' +
			'	   <prefix>allow <Argument>, <Argument>, ...\u000d' +
			'	   <prefix>a <Argument>\u000d' +
			'	   <prefix>a <Argument>, <Argument>, ...\u000d',
			extraHelp: 'This command will allow a specific role to be self-assignable, via the Get Role command.\u000d\u000d' +
			'Argument information below...\u000d\u000d' +
			'Role Name : The name of the role to be allowed.\u000d\u000d' +
			'*If Sweeper Bot tells you to be more specific, type the role as if it were case-sensitive. Sweeper Bot will then find your specific role.',
			group: 'assignment',
			roles: ['The Vanguard', 'Moderators'],
			guildOnly: true
		});
	}

	public async action(message: Message, args: string[]): Promise<any> {
		// make sure a role was specified
		if (args.length === 0)
			return message.channel.send('Please specify a role to allow.');

		// start typing
		message.channel.startTyping();

		// grab the guild storage, available roles, and server roles
		const guildStorage: GuildStorage = this.client.storage.guilds.get(message.guild.id);
		let availableRoles: Array<any> = await guildStorage.get('Server Roles');
		const serverRoles: Array<any> = Array.from(message.guild.roles.entries()).sort((a: any, b: any) => b[1].position - a[1].position);

		// grab the two admin level roles
		let adminCommandRole: Role = message.guild.roles.find('name', 'The Vanguard');
		let altAdminCommandRole: Role = message.guild.roles.find('name', 'Moderators');

		// create user supplied role vars
		let roleArgs: Array<any> = new Array();
		let role: Role;
		let beMoreSpecific: boolean = false;

		// create display vars
		let invalidRoles: Array<string> = new Array();
		let validRoles: Array<Role> = new Array();
		let inspecificRoles: Array<string> = new Array();
		const embed: RichEmbed = new RichEmbed();

		// create array from user input
		roleArgs = message.content.match(Constants.cslRegExp);
		roleArgs = roleArgs.map((el: string) => { return el.toString().replace(Constants.allowRegExp, ''); });

		// map roles
		let roleMap: any = serverRoles.filter((el: any) => {
			if (el[1].position < altAdminCommandRole.position && el[1].name !== '@everyone' && el[1].managed === false)
				return el[1];
		});

		roleArgs.forEach((el: any) => {
			// search for role
			let options: any = { extract: (r: any) => { return r[1].name; } };
			let results: Array<any> = fuzzy.filter(el, roleMap, options);

			// check if role is valid
			if (results.length === 0)
				invalidRoles.push(el);

			// if one role found
			if (results.length === 1) {
				// role from result
				role = results[0].original[1];

				// check if role already is allowed
				if (Assignment.doesRoleExist(availableRoles, role))
					// add role to invalid array
					invalidRoles.push(el);
				else
					// add role to valid array
					validRoles.push(role);
			}

			// if more than one role found
			if (results.length > 1) {
				// check if roleArg is specifically typed
				if (Assignment.isSpecificResult(results, el)) {
					// role from roleArg
					role = Assignment.getSpecificRole(results, el);

					// check if role already is allowed
					if (Assignment.doesRoleExist(availableRoles, role))
						invalidRoles.push(role.name);

					// add role to valid array
					validRoles.push(role);
				} else
					// add inspecific results to invalid array
					results.forEach((r: any) => { invalidRoles.push(r.string); });
			}
		});

		// update roles
		validRoles.forEach((el: Role) => { Assignment.updateRoles(availableRoles, guildStorage, el); });

		// there are no invalid roles or inspecific roles
		if (validRoles.length > 0 && invalidRoles.length === 0 && inspecificRoles.length === 0) {
			message.channel.send(`Successfully allowed ${validRoles.join(', ')}.`);
			return message.channel.stopTyping();
		}

		// there are only invalid roles
		if (validRoles.length === 0 && invalidRoles.length > 0 && inspecificRoles.length === 0) {
			message.channel.send(`The following role(s) are invalid: \`${invalidRoles.join('`, `')}\`.`);
			return message.channel.stopTyping();
		}

		// there are only inspecific roles
		if (validRoles.length === 0 && invalidRoles.length === 0 && inspecificRoles.length > 0) {
			message.channel.send(`The following role(s) are inspecific: \`${inspecificRoles.join('`, `')}\`.`);
			return message.channel.stopTyping();
		}

		// there are a mixture of inspecifc and invlaid roles
		if (validRoles.length === 0 && invalidRoles.length > 0 && inspecificRoles.length > 0) {
			// build output embed
			embed
				.setColor(Constants.embedColor)
				.setTitle(message.guild.name + ': Roles Update')
				.addField('Inspecific Roles', inspecificRoles.join('\n') ? inspecificRoles.join('\n') : '\u200b', true)
				.addField('Invalid Roles', invalidRoles.join('\n') ? invalidRoles.join('\n') : '\u200b', true);

			// display output embed
			message.channel.send({ embed: embed });
			return message.channel.stopTyping();
		}

		// there are a mixture of valid and invlaid roles
		if (validRoles.length > 0 && invalidRoles.length > 0 && inspecificRoles.length === 0) {
			// build output embed
			embed
				.setColor(Constants.embedColor)
				.setTitle(message.guild.name + ': Roles Update')
				.addField('Allowed Roles', validRoles.join('\n') ? validRoles.join('\n') : '\u200b', true)
				.addField('Invalid Roles', invalidRoles.join('\n') ? invalidRoles.join('\n') : '\u200b', true);

			// display output embed
			message.channel.send({ embed: embed });
			return message.channel.stopTyping();
		}
	}
}
