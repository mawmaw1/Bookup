const _startDate = Symbol();
const _endDate = Symbol();
const _getDifferenceInMs = Symbol();


function Timer(){
    this[_startDate] = null;
    this[_endDate] = null;
    this.elapsed = null;
}

Timer.prototype.start = function(){
    this[_startDate] = new Date();
};

Timer.prototype.stop = function(){
    this[_endDate] = new Date();
    this.elapsed = this[_getDifferenceInMs](this[_endDate], this[_startDate]);
};

Timer.prototype[_getDifferenceInMs] = function(endDate, startDate){
    const getMs = (date) => date.getTime();
    return getMs(endDate) - getMs(startDate);
};

module.exports = Timer;