import userActionsService from "./user-actions.service";

class UserActionsController {
    constructor() {
        this.userActionsService = userActionsService;
    }

    async getOne(req, res) {
        const userId = req.params.userId;

        const userActions = await this.userActionsService.getOne(userId);

        res.statusCode(200).json({
            message: "User actions retrieved successfully",
            data: userActions
        });
    }

    async getAll(req, res) {
        const users = await this.userActionsService.getAll();

        res.statusCode(200).json({
            message: "User actions retrieved successfully",
            data: users
        });
    }
}

const userActionsController = new UserActionsController();
module.exports = userActionsController;