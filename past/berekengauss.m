function [gauss] = berekengauss(size,sigma)
% [gauss] = berekengauss(c)
% maakt een gaussian filter, die we gebruiken bij het maken van de HSM3

% gejat uit fspecial
siz                         = (size-1)/2;
[xx,yy]                     = meshgrid(-siz(2):siz(2),-siz(1):siz(1));
arg                         = -(xx.*xx + yy.*yy)/(2*sigma*sigma);
h                           = exp(arg);
h(h<eps*max(h(:)))          = 0;

sumh                        = sum(h(:));
if sumh ~= 0,
    gauss                   = h/sumh;
end
