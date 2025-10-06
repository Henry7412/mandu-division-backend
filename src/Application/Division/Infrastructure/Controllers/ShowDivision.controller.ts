import { Controller, Get, Param } from "@nestjs/common";
import { successResponse } from "src/Shared/Infrastructure/Response/Response.json";
import { DivisionIdDto } from "../Dto/DivisionId.dto";
import { ShowDivisionUseCase } from "../../Application/Get/ShowDivision.useCase";

@Controller('division')
export class ShowDivisionController {
    constructor(private readonly showDivisionUseCase: ShowDivisionUseCase) { }

    @Get('show/:id')
    async __invoke(@Param() divisionIdDto: DivisionIdDto): Promise<any> {
        return await this.showDivisionUseCase.__invoke(divisionIdDto);
    }
}