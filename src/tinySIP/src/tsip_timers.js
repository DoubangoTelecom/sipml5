/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
tsip_timers.prototype.TIMER_T1 = 500;
tsip_timers.prototype.TIMER_T4 = 5000;

var tsip_timers_e =
{
    T1: tsip_timers.prototype.TIMER_T1,
    T2: 4000,
    T4: tsip_timers.prototype.TIMER_T4,
    A: tsip_timers.prototype.TIMER_T1,
    B: 64 * tsip_timers.prototype.TIMER_T1,
    C: 5*60000,
    D: 50000,
    E: tsip_timers.prototype.TIMER_T1,
    F: 64 * tsip_timers.prototype.TIMER_T1,
    G: tsip_timers.prototype.TIMER_T1,
    H: 64 * tsip_timers.prototype.TIMER_T1,
    I: tsip_timers.prototype.TIMER_T4,
    J: 64 * tsip_timers.prototype.TIMER_T1,
    K: tsip_timers.prototype.TIMER_T4,
    L: 64 * tsip_timers.prototype.TIMER_T1,
    M: 64 * tsip_timers.prototype.TIMER_T1
};

function tsip_timers() {
    this.T1 = tsip_timers_e.T1;
    this.T2 = tsip_timers_e.T2;
    this.T4 = tsip_timers_e.T4;
    this.A = tsip_timers_e.A;
    this.B = tsip_timers_e.B;
    this.C = tsip_timers_e.C;
    this.D = tsip_timers_e.D;
    this.E = tsip_timers_e.E;
    this.F = tsip_timers_e.F;
    this.G = tsip_timers_e.G;
    this.H = tsip_timers_e.H;
    this.I = tsip_timers_e.I;
    this.J = tsip_timers_e.J;
    this.K = tsip_timers_e.K;
    this.L = tsip_timers_e.L;
    this.M = tsip_timers_e.M;
}

tsip_timers.prototype.getA = function () { return this.A; }
tsip_timers.prototype.getB = function () { return this.B; }
tsip_timers.prototype.getC = function () { return this.C; }
tsip_timers.prototype.getD = function () { return this.D; }
tsip_timers.prototype.getE = function () { return this.E; }
tsip_timers.prototype.getF = function () { return this.F; }
tsip_timers.prototype.getG = function () { return this.G; }
tsip_timers.prototype.getH = function () { return this.H; }
tsip_timers.prototype.getI = function () { return this.I; }
tsip_timers.prototype.getJ = function () { return this.J; }
tsip_timers.prototype.getK = function () { return this.K; }
tsip_timers.prototype.getL = function () { return this.L; }
tsip_timers.prototype.getM = function () { return this.M; }
tsip_timers.prototype.getT1 = function () { return this.T1; }
tsip_timers.prototype.getT2 = function () { return this.T2; }
tsip_timers.prototype.getT4 = function () { return this.T4; }

tsip_timers.prototype.setT1 = function(i_t1){
	this.T1 = i_t1;
	this.A = this.E = this.G = this.T1;
	this.B = this.F = this.H = this.J = (this.T1*64);
}

tsip_timers.prototype.setT2 = function(i_t2){
	this.T2 = i_t2;
}

tsip_timers.prototype.setT4 = function(i_t4){
	this.T4 = i_t4;
	this.I = this.K = this.T4;
}

tsip_timers.prototype.setA = function(i_a){
	 this.A = i_a;
}

tsip_timers.prototype.setB = function(i_b){
    if(this){
	    this.B = i_b;
    }
}

tsip_timers.prototype.setC = function(i_c){
    this.C = i_c;
}

tsip_timers.prototype.setD = function(i_d){
    this.D = i_d;
}

tsip_timers.prototype.setE = function(i_e){
    this.E = i_e;
}

tsip_timers.prototype.setF = function(i_f){
    this.F = i_f;
}

tsip_timers.prototype.setG = function(i_g){
    this.G = i_g;
}

function tsip_timers_setH(i_h){
    this.H = i_h;
}

tsip_timers.prototype.setI = function(i_i){
    this.I = i_i;
}

tsip_timers.prototype.setJ = function(i_j){
    this.J = i_j;
}

tsip_timers.prototype.setK = function(i_k){
    this.K = i_k;
}

tsip_timers.prototype.setL = function(i_l){
    this.L = i_l;
}

tsip_timers.prototype.setM = function(i_m){
    this.M = i_m;
}