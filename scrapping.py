#Web scraping site KEGG :
#Entree : ID
#Sortie : Dictionnaire : ID - Annotation de l'ID
#Prerequis : Installation du module requests et de la bibliotheque BeautifulSoup

import requests, bs4

Dico_annot = {}

debut_url = "http://www.kegg.jp/dbget-bin/www_bfind_sub?mode=bfind&max_hit=1000&dbkey=kegg&keywords="

listeID = ["A9F13_01g04059","A9F13_03g02101","A9F13_01g09977"]

for ID in listeID:
	url_ID = debut_url + ID
	r = requests.get(url_ID)
	soup = bs4.BeautifulSoup(r.text,"lxml")
	div_annot = soup.findAll('div', style="margin-left:2em")
	div_annot = str(div_annot)
	text_partiel = div_annot.split('<div style="margin-left:2em"> ')
	text_partiel = text_partiel[1].split("</div>")
	annotation = text_partiel[0]
	Dico_annot[ID] = annotation
	print ID,':', annotation

#Toutes les infos sont dans Dico_annot :)
