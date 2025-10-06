import { Controller, Get, Query } from "@nestjs/common";
import { PaginationListDto } from "../Dto/PaginationList.dto";
import { ListAllDivisionUseCase } from "../../Application/Get/ListAllDivision.useCase";

@Controller('division')
export class ListAllDivisionController {
    constructor(private readonly listAllDivisionUseCase: ListAllDivisionUseCase) { }

    @Get('list')
    async __invoke(@Query() paginationListDto: PaginationListDto): Promise<any> {
        return await this.listAllDivisionUseCase.__invoke(paginationListDto);
    }
}