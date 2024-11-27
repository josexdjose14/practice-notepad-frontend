process.stdin.on('data', data => {
    const input = data.toString().trim();

    /* Call the main function */
    main(input);
});

function main(input) {

    let output = 0;

    for (const element of input) {
        if (element == "a" || element == "e" || element == "i" || element == "o" || element == "u") {
            output++
        }
    }
    console.log(output);
}