import prisma from "../prisma/prisma";
export const getAlerts = async (req, res) => {
    const clerkUserId = req.auth.userId;
    const alerts = await prisma.alert.findMany({
        where: { userId: clerkUserId },
        orderBy: { createdAt: "desc" },
    });
    res.json(alerts);
};
export const markAsRead = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "Alert ID is required" });
    }
    await prisma.alert.update({
        where: { id },
        data: { read: true }
    });
    res.json({ success: true });
};
export const clearAllAlerts = async (req, res) => {
    const clerkUserId = req.auth.userId;
    await prisma.alert.deleteMany({
        where: { userId: clerkUserId, read: true }
    });
    res.json({ message: "Alertes lues supprimées" });
};
//# sourceMappingURL=alert.controller.js.map