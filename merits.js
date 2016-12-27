console.log(
    require(process.argv[2]).filter(d => d.section === 'Merits')[0].items.reduce((o,v) => {
    o += v.pts; return o; }, 0)
)
