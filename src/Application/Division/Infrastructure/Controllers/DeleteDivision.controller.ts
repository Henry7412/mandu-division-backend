import { Controller, Delete, Param } from "@nestjs/common";
import { I18nService } from "nestjs-i18n/dist/services/i18n.service";
import { successResponse } from "src/Shared/Infrastructure/Response/Response.json";
import { DivisionIdDto } from "../Dto/DivisionId.dto";
import { DeleteDivisionUseCase } from "../../Application/Delete/DeleteDivision.useCase";

@Controller('division')
export class DeleteDivisionController {
    constructor(private readonly deleteDivisionUseCase: DeleteDivisionUseCase, private readonly i18n: I18nService) { }

    @Delete('delete/:id')
    async __invoke(@Param() divisionIdDto: DivisionIdDto): Promise<any> {
        const response = await this.deleteDivisionUseCase.__invoke(divisionIdDto);
        return successResponse(this.i18n, 'message.deleted', response);
    }
}