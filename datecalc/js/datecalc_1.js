var form = document.getElementsByTagName('form')[0];

var timeFromFirst = function () {
    var first = new Date(form.firstDate.value).getTime(),
        second = new Date(form.secondDate.value).getTime(),
        diff = new Date(Math.abs(second - first)),
        years = diff.toISOString().slice(0, 4) - 1970,
        months = diff.getMonth(),
        days = diff.getDate() - 1;
    var result = document.getElementById('result').innerHTML = 'Между датами прошло ' + years + ' лет, ' + months + ' месяца, ' + days + ' дня.';
}

for (var i = 0; i < form.length; i++) {
    form[i].addEventListener('change', timeFromFirst);
}

window.onload = timeFromFirst;
