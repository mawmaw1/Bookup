CREATE TABLE public.book (
    id bigint   PRIMARY KEY,
    author  VARCHAR(2000),
    title VARCHAR(2000)
);

CREATE TABLE public.bracities (
    cityname VARCHAR(2000) PRIMARY key
);

CREATE TABLE public.citiesbook (
    bookid bigint REFERENCES public.book(id),
    cityname VARCHAR(2000) REFERENCES public.bracities(cityname)
);

INSERT INTO public.bracities cityname values ('Washington, D.C.');

INSERT INTO public.cities
SELECT cityid::bigint, cityname 
FROM public.citiesimport;

INSERT INTO public.book
SELECT (data->>'id')::BIGINT as id, (data->>'Author')::VARCHAR as author, (data->>'Title')::VARCHAR as title
FROM public.data2;

INSERT INTO public.citiesbook
SELECT (data->>'id')::BIGINT as bookid, json_array_elements_text(data->'Cities')
FROM public.data2;

