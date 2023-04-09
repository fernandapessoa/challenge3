import { IReserveRepository } from './IReserveRepository';
import { reserveRepository } from './reserveRepository';
import { Reserve } from './IReserve';
import { convertDate } from '../../utils/convertDate';
//import { AppError } from '../../errors/AppError';
import { UpdateQuery } from 'mongoose';

export class ReserveService {
	private reserveRepository: IReserveRepository;

	constructor(reserveRepository: IReserveRepository) {
		this.reserveRepository = reserveRepository;
	}

	async registerReserve(query: any) {
		let { start_date, end_date } = query;
		const { id_car } = query;
		const id_user = query.user._id;

		start_date = new Date(convertDate(start_date));
		end_date = new Date(convertDate(end_date));

		const reserveData = {
			start_date,
			end_date,
			id_car,
			id_user,
			final_value: 10,
		};

		const registeredData = await this.reserveRepository.registerReserve(
			reserveData
		);
		return registeredData;
	}

	async getAllReservea(userId: string) {
		const reserves = await this.reserveRepository.getReserveById(userId);
		return reserves;
	}

	async getReserveById(userId: string, reserveId: string) {
		const reserve = await this.reserveRepository.getReserveById(
			userId,
			reserveId
		);
		return reserve;
	}

	async updateReserveById(
		userId: string,
		reserveId: string,
		updateBody: UpdateQuery<Reserve>
	): Promise<Reserve | null> {
		const reserve = await this.reserveRepository.updateReserveById(
			userId,
			reserveId,
			updateBody
		);
		return reserve;
	}
}

const reserveService = new ReserveService(reserveRepository);
export { reserveService };
