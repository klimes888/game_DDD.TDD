import { Injectable } from '@nestjs/common';
import { AttackDto } from '../dto/attack.dto';

@Injectable()
export class BattleService {
  attack(dto: AttackDto) {
    // const player = new Player(dto.playerName);
    // const monster = new Monster(dto.monsterName);

    // player.attack(monster);

    return {
      //   player: player.name,
      //   monster: monster.name,
      //   monsterHp: monster.hp,
    };
  }
}
