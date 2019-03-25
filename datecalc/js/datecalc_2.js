/*Навешиваем на input обработчик события onchange*/
$(":input").change(calculateDate);
/*Навешиваем на document обработчик готовности*/
$(document).ready(loadCalc);
/*функция подстановки названия числительного*/
function declOfNum(number, titles) {
    cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};

function calculateDate() {
    /*создаем объект moment() с начальной датой из поля ввода*/
    var firstDate = moment($("[name=firstDate]").val());
    /*создаем объект moment() с конечной датой из поля ввода*/
    var secondDate = moment($("[name=secondDate]").val());
    /*вычисляем функцией diff() разность в годах*/
    var years = Math.abs(firstDate.diff(secondDate, "years"));
    /*вычисляем функцией diff() разность в месяцах и сохраняем остаток от деления на 12*/
    var months = Math.abs(firstDate.diff(secondDate, "months")) % 12;
    /*прибавляем или отнимаем к/от начальной дате год и месяцы для получения разницы в днях*/
    if (firstDate < secondDate) {
        var secondDate2 = firstDate.add({
            years: years,
            months: months
        });
    } else {
        var secondDate2 = firstDate.subtract({
            years: years,
            months: months
        });
    }
    /*получение разницы в днях*/
    var days = Math.abs(secondDate2.diff(secondDate, "days"));

    $("#result").text("Между датами прошло: " + years + " " + declOfNum(years, ["год", "года", "лет"]) + " " + months + " " + declOfNum(months, ["месяц", "месяца", "месяцев"]) + " " + days + " " + declOfNum(years, ["день", "дня", "дней"]));

    /*сохраняем значение для начальной даты в хранилище*/
    window.localStorage.setItem("firstDate", $("[name=firstDate]").val());
};

function loadCalc() {
    /*установка текущей даты вторым значением*/
    $("[name=secondDate]").val(moment().format("YYYY-MM-DD"));
    /*чтение и установка значения для начальной даты из хранилища*/
    var firstDateLS = window.localStorage.getItem("firstDate");
    if (firstDateLS.length > 0) {
        $("[name=firstDate]").val(window.localStorage.getItem("firstDate"));
    }
    calculateDate();
};
