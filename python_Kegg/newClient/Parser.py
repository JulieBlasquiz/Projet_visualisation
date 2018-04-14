# Script permettant de parser le fichier de sortie de David :
from collections import Counter
from operator import itemgetter
from collections import OrderedDict

tot_annot = 0
liste_annot = []
liste_id = []
dico_index_annot = {}
dico_yep = {}
liste_value = []
dico_nb_annot = {}

liste_fichier_entree = ['list.tableReport1.txt','list.tableReport2.txt']

for a in range(2):
    with open(liste_fichier_entree[a], 'r') as f :
        for line in f :
            liste_annot.append(line.split(',')[0])
            liste_id.append(line.split(',')[1])
            tot_annot = tot_annot + 1

        for annotation in set(liste_annot):
    	    for i,annot in enumerate(liste_annot):
		    if annot == annotation:
			    dico_index_annot.setdefault(annot, set()).add(i)

        for cle,value in dico_index_annot.iteritems():
	    for v in value:
		    id_gene = liste_id[v]
		    liste_value.append(id_gene)
		    liste_value = list(set(liste_value))
	    dico_nb_annot[cle] = len(liste_value)
	    var = '_ '.join(j for j in liste_value)
	    dico_yep[cle] = var
	    liste_value = []
	    var = None

    with open(liste_fichier_entree[a], 'w') as f :
        for j in range(len(dico_yep)):
            f.write(str(dico_yep.keys()[j])+','+str(dico_nb_annot.values()[j])+','+'0'+','+'0'+','+str(tot_annot)+','+str(dico_yep.values()[j])+'\n')

liste_annot1 = []
liste_id1 = []
liste_nb_annot1 = []
dico_annot_commune1 = {}
dico_annot_id1 = {}

liste_id_commun = []
dico_nb_idcommun = {}
dico_idcommun = {}
var2 = None

liste_annot2 = []
liste_id2 = []
liste_nb_annot2 = []
dico_annot_commune2 = {}
dico_annot_id2 = {}

with open('list.tableReport1.txt', 'r') as f :
    for line in f :
        if line != "Annot,1,2,3,N,geneID":
            liste_annot1.append(line.split(',')[0])
	    liste_nb_annot1.append(line.split(',')[1])
            liste_id1.append(line.split(',')[5])
        tot_annot1 = line.split(',')[4]

with open('list.tableReport2.txt', 'r') as f :
    for line in f :
        if line != "Annot,1,2,3,N,geneID":
            liste_annot2.append(line.split(',')[0])
	    liste_nb_annot2.append(line.split(',')[1])
            liste_id2.append(line.split(',')[5])
        tot_annot2 = line.split(',')[4]

tot_total = int(tot_annot1) + int(tot_annot2)

for i in range(len(liste_annot1)):
    if liste_annot1[i] in liste_annot2:
        dico_annot_commune1[liste_annot1[i]] = liste_nb_annot1[i]
        dico_annot_id1[liste_annot1[i]] = liste_id1[i].strip("\n")

for i in range(len(liste_annot2)):
    if liste_annot2[i] in liste_annot1:
        dico_annot_commune2[liste_annot2[i]] = liste_nb_annot2[i]
        dico_annot_id2[liste_annot2[i]] = liste_id2[i].strip("\n")

for annotation in dico_annot_commune2:
        for annot in dico_annot_commune1.keys():
            if annot == annotation:
		liste_temp1 = dico_annot_id1[annot].split('_ ')		
		liste_temp2 = dico_annot_id2[annot].split('_ ')
		liste_temp1 = list(set(liste_temp1))
		liste_temp2 = list(set(liste_temp2))
		for i in range(len(liste_temp1)):
		    if liste_temp1[i] in liste_temp2:
			liste_id_commun.append(liste_temp1[i])
			var2 = '_ '.join(j for j in liste_id_commun)
			dico_nb_idcommun[annot] = len(liste_id_commun)
		        dico_idcommun[annot] = var2
		liste_id_commun = []
		var2 = None

dico_annot_commune1 = OrderedDict(sorted(dico_annot_commune1.items(), key=lambda t: t[0]))
dico_annot_commune2 = OrderedDict(sorted(dico_annot_commune2.items(), key=lambda t: t[0]))
dico_idcommun = OrderedDict(sorted(dico_idcommun.items(), key=lambda t: t[0]))
dico_annot_id1 = OrderedDict(sorted(dico_annot_id1.items(), key=lambda t: t[0]))
dico_annot_id2 = OrderedDict(sorted(dico_annot_id2.items(), key=lambda t: t[0]))

with open('result.txt', 'w') as f :
    f.write('Annot'+','+'1'+','+'2'+','+'3'+','+'N'+','+'geneID1'+','+'geneIDCommon'+','+'geneID2')
    for annot in dico_annot_commune1.keys():
        f.write('\n'+str(annot)+','+str(dico_annot_commune1[annot])+','+str(dico_nb_idcommun[annot])+','+str(dico_annot_commune2[annot])+','+str(tot_total)+','+str(dico_annot_id1[annot])+','+str(dico_idcommun[annot])+','+str(dico_annot_id2[annot]))

    for i in range(len(liste_annot1)):
        if liste_annot1[i] not in liste_annot2:
	    f.write('\n'+str(liste_annot1[i])+','+str(liste_nb_annot1[i])+','+'0'+','+'0'+','+str(tot_total)+','+str(liste_id1[i].strip("\n"))+','+""+','+"")

    for i in range(len(liste_annot2)):
        if liste_annot2[i] not in liste_annot1:
	    f.write('\n'+str(liste_annot2[i])+','+'0'+','+'0'+','+str(liste_nb_annot2[i])+','+str(tot_total)+','+""+','+""+','+str(liste_id2[i].strip("\n")))
