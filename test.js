const p = new Promise((resolve, reject) => {
    reject(Error('hi'));
});

p.then((result) => {
    console.log(result);
}).catch((err) => console.log('no'));
