import { Injectable } from "@nestjs/common";
import { DivisionService } from "../../Infrastructure/Services/Division.service";
import { DivisionIdDto } from "../../Infrastructure/Dto/DivisionId.dto";

@Injectable()
export class ShowDivisionUseCase {
    constructor(private readonly divisionService: DivisionService) { }

    async __invoke(divisionIdDto: DivisionIdDto): Promise<any> {
        return await this.divisionService.showDivision(divisionIdDto);
    }
}