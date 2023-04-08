import { UserService, userService } from './userService';
import { Request, Response, NextFunction } from 'express';
import { User } from './IUser';
import { CatchExpressError } from '../../decorators/CatchExpressError';

export class UserController {
	private userService: UserService;

	constructor(userService: UserService) {
		this.userService = userService;
	}

	@CatchExpressError
	async registerUser(req: Request, res: Response, _next: NextFunction) {
		const userData: User = req.body;
		const token = await this.userService.registerUser(userData);

		res.header('Authorization', 'Bearer ' + token);

		return res.status(201).json({
			status: 'success',
			token: token,
		});
	}

	@CatchExpressError
	async getUser(req: Request, res: Response, _next: NextFunction) {
		const userId = req.params.id;
		const user: User = await this.userService.getUser(userId);

		return res.status(200).json({
			status: 'success',
			data: user,
		});
	}

	@CatchExpressError
	async deleteUser(req: Request, res: Response, _next: NextFunction) {
		const userId = req.params.id;
		await this.userService.deleteUser(userId);

		return res.status(204).json({
			status: 'success',
			data: null,
		});
	}

	@CatchExpressError
	async updateUser(req: Request, res: Response, _next: NextFunction) {
		const userId = req.params.id;
		const updateBody = req.body;
		const user: User = await this.userService.updateUser(userId, updateBody);

		return res.status(200).json({
			status: 'success',
			data: user,
		});
	}

	@CatchExpressError
	async authenticateUser(req: Request, res: Response, _next: NextFunction) {
		const { email, password } = req.body;
		const token = await this.userService.authenticateUser(email, password);

		res.header('Authorization', 'Bearer ' + token);

		return res.status(200).json({
			status: 'success',
		});
	}
}

const userController = new UserController(userService);
export { userController };
