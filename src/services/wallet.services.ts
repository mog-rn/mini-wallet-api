import {prisma} from "../lib/prisma.ts";

export const create = async (ownerName: string) => {
    return await prisma.wallet.create({
        data: {
            ownerName
        }
    });
}

export const findAll = async () => {
    return await prisma.wallet.findMany();
}

export const findOne = async (id: string) => {
    return await prisma.wallet.findUnique({
        where: {
            id
        }
    });
}
