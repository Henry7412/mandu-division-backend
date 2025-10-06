import { Injectable } from "@nestjs/common";
import { DivisionService } from "../../Infrastructure/Services/Division.service";
import { PaginationListDto } from "../../Infrastructure/Dto/PaginationList.dto";

@Injectable()
export class ListAllDivisionUseCase {
    constructor(private readonly divisionService: DivisionService) { }

    async __invoke(paginationListDto: PaginationListDto): Promise<any> {
        return await this.divisionService.listAllDivisions(paginationListDto);
    }
}