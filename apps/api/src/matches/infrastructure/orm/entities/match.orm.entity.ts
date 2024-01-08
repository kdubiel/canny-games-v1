import { TicTacToeGameState } from '@canny-games/common';
import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { CustomBaseEntity } from '@/shared/entities/custom-base.entity';
import { UserEntity } from 'src/users/infrastructure/orm/entities/user.entity';
import { MatchEntity } from '@/matches/domain/entities/match.entity';
import { MatchDto } from '@/matches/public/dto/match.dto';

@Entity({
  collection: 'matches',
})
export class MatchOrmEntity extends CustomBaseEntity implements MatchEntity {
  @ManyToOne()
  playerX: UserEntity;

  @ManyToOne()
  playerO: UserEntity;

  @ManyToOne({ nullable: true })
  winner: UserEntity | null;

  @Property({ type: 'json' })
  state!: TicTacToeGameState;

  toDto(): MatchDto {
    return {
      id: this.id,
      playerX: this.playerX.id,
      playerO: this.playerO.id,
      winner: this.winner?.id ?? null,
      state: this.state,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
