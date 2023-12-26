import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { ViewDataType } from "../types/view";
import { genRandomKey } from "../Helpers/genRandomKey";

export function ViewController() {
    const VIEW = new PrismaClient().view;
    const operations = {
        getAllSites: async (req: Request, res: Response) => {
            const { from, to } = req.query;
            try {
                const users: ViewDataType[] = await VIEW.findMany();
                let filteredSites;
                if (Array.isArray(users) && users.length !== 0) {
                    if (from && to && from instanceof Date && to instanceof Date) {
                        filteredSites = users.filter((date) => {
                            return date.createdAt >= new Date(from) && date.createdAt <= new Date(to)
                        })
                    } else {
                        filteredSites = users.map((sites) => sites.sitename)
                    }
                }
                res.json(filteredSites).status(200)

            } catch (error) {
                res.json({
                    message: 'cannot get all sites',
                    error
                }).status(400)
            }

        },
        getSitesById: async (req: Request, res: Response) => {
            try {
                const { id } = req.params;
                let user;
                if (id && !isNaN(parseInt(id))) {
                    user = await VIEW.findFirst({
                        where: { id: Number(id) }
                    })
                    console.log(user)
                    if (typeof user !== "number") {
                        res.json(user).status(200);
                    }
                    else {
                        throw { message: `Cannot find site by id :${id}` }
                    }
                }
                else {
                    throw { message: `Cannot find site by id :${id}` }
                }

            } catch (error) {
                res.json(error)
            }
        },
        updateViewByKey: async (req: Request, res: Response) => {
            const { count, sitename} = req.body;
            const { key } = req.params;

            try {
                if (key) {
                    const isExistSite = await VIEW.findFirst({
                        where: { key:key }
                    })
                    if (isExistSite) {
                        const updatedData = await VIEW.update({
                            where: {
                                key: key
                            },

                            data: {
                                sitename: sitename && sitename!==isExistSite.sitename? sitename : isExistSite.sitename,
                                viewCount: count ? count : isExistSite.viewCount,
                                updatedAt: sitename || typeof count==="number" ? new Date().toISOString():null
                            }
                        })
                        res.json(updatedData).status(204)
                    }

                }
            } catch (error) {
                res.send(error)
            }
        },
        createSite: async (req: Request, res: Response) => {
            const { site } = req.body;
            try {
                if (site) {
                    const isExistSite = await VIEW.findFirst({
                        where: { sitename: site.trim() }
                    })
                    try {
                        if (!isExistSite) {
                            const newSite = await VIEW.create({
                                data: {
                                    key: genRandomKey(),
                                    sitename: site.toLowerCase().trim()
                                }
                            })
                            res.json(newSite).status(202)
                        }
                        else {
                            throw 'site already found'
                        }
                    } catch (error) {
                        res.json(error)
                    }
                }
                else {
                    throw 'Body must contain site and cannot be empty'
                }
            } catch (error) {
                res.json(error)
            }

        }
    }
    return { ...operations }
}