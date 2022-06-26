export default function Topics( ids, titulos ) {
    var topics = ""

    ids.forEach(function(value, index){
        topics+=`<a  href=#${value}>->${titulos[index]}<-</a></br>`
    })
    return topics
}