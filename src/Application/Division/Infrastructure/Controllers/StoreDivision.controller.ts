import { Body, Controller, Post } from "@nestjs/common";
import { StoreDivisionDto } from "../Dto/StoreDivision.dto";
import { StoreDivisionUseCase } from "../../Application/Post/StoreDivision.useCase";
import { I18nService } from "nestjs-i18n/dist/services/i18n.service";
import { successResponse } from "src/Shared/Infrastructure/Response/Response.json";

@Controller('division')
export class StoreDivisionController {
    constructor(private readonly storeDivisionUseCase: StoreDivisionUseCase, private readonly i18n: I18nService) { }

    @Post('store')
    async __invoke(@Body() storeDivisionDto: StoreDivisionDto): Promise<any> {
        const response = await this.storeDivisionUseCase.__invoke(storeDivisionDto);

        return successResponse(this.i18n, 'message.created', response);
    }
};