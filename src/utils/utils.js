export const averageCalculate = ( ratings ) => {
    if (ratings.length === 0)
    return 0
    let moyenne = ratings.reduce((acc, current) => acc += current.stars, 0);
    moyenne = moyenne/ratings.length;

    return moyenne;
}