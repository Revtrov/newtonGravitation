let fizzBuzz = (min, max) => {
    for (let i = min; i <= max; i++) {
        console.log((i % 3 ? '' : 'Fizz') + (i % 5 ? '' : 'Buzz') || i)
    }
}
fizzBuzz(10, 50)