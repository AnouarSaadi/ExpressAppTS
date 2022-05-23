import { CreateUserDto } from "../../dto/create-user.dto";
import { User } from "../../model/user.model";

export class UsersService {
    private static usersService: UsersService;

    constructor() {

    }

    public static getInstance(): UsersService {
        if (!UsersService.usersService) {
            UsersService.usersService = new UsersService();
        }
        return UsersService.usersService;
    }

    async addUser(userData: CreateUserDto): Promise<User> {
        try {
            const user = await User.create<User>({
                email: userData.email,
                verified: userData.verified,
                name: userData.name,
                familyName: userData.familyName,
                givenName: userData.givenName,
                photo: userData.photo,
            });
            return user;
        } catch (error) {
            throw error;
        }
    }

    async findAll(): Promise<User[]> {
        return await User.findAll();
    }

    async findByEmail(email: string): Promise<User | null> {
        try {
            const user = await User.findOne({ where: { email } });
            return user;
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<User | null> {
        try {
            const user = await User.findOne({ where: { id } });
            return user;
        } catch (error) {
            throw error;
        }
    }

    async deleteById(id: number): Promise<string> {
        try {
            await User.sequelize?.query({
                query: `DELETE FROM users WHERE id = ?`,
                values: [id]
            });
            return "user deleted";
        } catch (err) {
            throw err;
        }
    }

}