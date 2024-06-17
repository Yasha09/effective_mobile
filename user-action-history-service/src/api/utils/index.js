module.exports = (query) => {
    const {
        sort,
        userId,
        firstName,
        email
    } = query;

    const page = query?.page ? parseInt(query.page) : 1;
    const limit = query?.limit ? parseInt(query.limit) : 10;

    const queryBuilder = this.userActionsRepository
        .createQueryBuilder('userAction')
        .take(limit)
        .skip((page - 1) * limit)

    if (query?.sort) {
        queryBuilder.orderBy(`userAction.${sort}`, query?.order ?? 'DESC')
    } else {
        queryBuilder.orderBy('userAction.createdAt', 'DESC')
    }

    if (userId) {
        queryBuilder.where('userAction.userId = :userId', {userId: query.userId})
    }

    if (firstName) {
        queryBuilder.andWhere('userAction.actionData.firstName = :firstName', {firstName: `%${query.firstName}%`})
    }

    if (email) {
        queryBuilder.andWhere('userAction.actionData.email ILIKE :email', {email: `%${query.email}%`})
    }

    return queryBuilder;
}