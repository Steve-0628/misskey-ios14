import { Inject, Injectable } from '@nestjs/common';
import { DI } from '@/di-symbols.js';
import type { FlashLikesRepository } from '@/models/index.js';
import type { User } from '@/models/entities/User.js';
import type { FlashLike } from '@/models/entities/FlashLike.js';
import { bindThis } from '@/decorators.js';
import { Packed } from '@/misc/json-schema.js';
import { FlashEntityService } from './FlashEntityService.js';

@Injectable()
export class FlashLikeEntityService {
	constructor(
		@Inject(DI.flashLikesRepository)
		private flashLikesRepository: FlashLikesRepository,

		private flashEntityService: FlashEntityService,
	) {
	}

	@bindThis
	public async pack(
		src: FlashLike['id'] | FlashLike,
		me: { id: User['id'] } | null | undefined,
	) : Promise<Packed<'FlashLike'>> {
		const like = typeof src === 'object' ? src : await this.flashLikesRepository.findOneByOrFail({ id: src });

		return {
			id: like.id,
			flash: await this.flashEntityService.pack(like.flash ?? like.flashId, me),
		};
	}

	@bindThis
	public async packMany(
		likes: (FlashLike['id'] | FlashLike)[],
		me: { id: User['id'] } | null | undefined,
	) : Promise<Packed<'FlashLike'>[]> {
		return (await Promise.allSettled(likes.map(x => this.pack(x, me))))
			.filter(result => result.status === 'fulfilled')
			.map(result => (result as PromiseFulfilledResult<Packed<'FlashLike'>>).value);
	}
}
