import { Controller, Post } from '@nestjs/common';
// import { BattleService } from '../application/battle.service';
// import { AttackDto } from '../dto/attack.dto';

@Controller('game')
export class GameController {
  constructor() {}

  @Post('attack')
  attack() {
    // return this.battleService.attack(dto);
    return '';
  }
}
