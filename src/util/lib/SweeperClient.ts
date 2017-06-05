'use strict';

import { Client, ListenerUtil, LogLevel } from 'yamdbf';
import { TextChannel, RichEmbed, Message, Guild, GuildMember, VoiceChannel } from 'discord.js';

const config: any = require('../../config.json');

const { on, once } = ListenerUtil;

export class SweeperClient extends Client {
	public config: any;
	public constructor() {
		super({
			name: config.name,
			token: config.token,
			owner: config.owner,
			version: config.version,
			statusText: config.status,
			unknownCommandError: false,
			commandsDir: './commands',
			disableBase: [
				'clearlimit',
				'disablegroup',
				'enablegroup',
				'eval',
				'limit',
				'listgroups',
				'ping',
				'reload',
				'version'
			],
			readyText: 'Ready\u0007',
			ratelimit: '10/1m',
			pause: true,
			logLevel: LogLevel.INFO,
		});

		this.config = config;
	}

	@once('pause')
	private async _onPause(): Promise<void> {
		await this.setDefaultSetting('prefix', '.');
		this.emit('continue');
	}

	@on('voiceStateUpdate')
	private async _onVoiceStateUpdate(oldMember: GuildMember, newMember: GuildMember): Promise<void> {
		const voiceChannel: VoiceChannel = newMember.voiceChannel;

		if (voiceChannel && voiceChannel.members.size >= 1) {
			voiceChannel.clone();
		}
	}
}
