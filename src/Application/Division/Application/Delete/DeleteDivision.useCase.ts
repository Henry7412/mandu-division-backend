import { Injectable } from "@nestjs/common";
import { DivisionIdDto } from "../../Infrastructure/Dto/DivisionId.dto";
import { DivisionService } from "../../Infrastructure/Services/Division.service";

@Injectable()
export class DeleteDivisionUseCase {
    constructor(private readonly divisionService: DivisionService) { }

    async __invoke(divisionIdDto: DivisionIdDto): Promise<any> {
        return this.divisionService.deleteDivision(divisionIdDto);
    }

}