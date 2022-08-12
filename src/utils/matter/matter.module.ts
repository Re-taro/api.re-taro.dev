import { Module } from "@nestjs/common";
import { MatterService } from "./matter.service";

@Module({
  exports: [MatterService],
  providers: [MatterService],
})
export class MatterModule {}
