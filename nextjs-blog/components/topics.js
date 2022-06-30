export default function Topics(ids, titulos) {
    if (ids.length > 0){
        var topics = "<h3>Vá para um tópico:</h3>"

    ids.forEach(function (value, index) {
        topics += `<a  href=#${value}>${index + 1}. ${titulos[index]}</a></br>`
    })
    return topics
}else{
    return ""
}
}