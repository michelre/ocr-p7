export const averageCalculate = ( ratings ) => {
    let moyenne = ratings.reduce((acc, current) => acc += current.stars, 0);
    moyenne = moyenne/ratings.length;

    return moyenne;
}