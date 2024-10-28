const GETUser = async () => {
    const res = await fetch('https://670e3a38073307b4ee45facf.mockapi.io/users')
 
    if (!res.ok) {
        throw new Error('fetch user error!');
    }
    return res.json()
}
