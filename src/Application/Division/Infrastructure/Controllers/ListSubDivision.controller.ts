import { Controller, Get, Param } from "@nestjs/common";
import { DivisionIdDto } from "../Dto/DivisionId.dto";
import { ListSubDivisionUseCase } from "../../Application/Get/ListSubDivision.useCase";

@Controller('division')
export class ListSubDivisionController {
    constructor(private readonly listSubDivisionUseCase: ListSubDivisionUseCase) { }

    @Get(':id/subdivisions')
    async __invoke(@Param() divisionIdDto: DivisionIdDto): Promise<any> {
        return await this.listSubDivisionUseCase.__invoke(divisionIdDto);
    }
}