import { Body, Controller, Param, Put } from "@nestjs/common";
import { I18nService } from "nestjs-i18n/dist/services/i18n.service";
import { successResponse } from "src/Shared/Infrastructure/Response/Response.json";
import { UpdateDivisionDto } from "../Dto/UpdateDivision.dto";
import { UpdateDivisionUseCase } from "../../Application/Put/UpdateDivision.useCase";
import { DivisionIdDto } from "../Dto/DivisionId.dto";

@Controller('division')
export class UpdateDivisionController {
    constructor(private readonly updateDivisionUseCase: UpdateDivisionUseCase, private readonly i18n: I18nService) { }

    @Put('update/:id')
    async __invoke(@Param() divisionIdDto: DivisionIdDto, @Body() updateDivisionDto: UpdateDivisionDto): Promise<any> {
        const response = await this.updateDivisionUseCase.__invoke(divisionIdDto, updateDivisionDto);
        return successResponse(this.i18n, 'message.updated', response);
    }
};