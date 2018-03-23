#-*- coding: utf-8 -*-

import os, sys
import requests #permet d'envoyer des demandes sur réseau
import json
import urllib,urllib2

def chargerListeIDgenes(nomFichier):
    listeIDgenesFichier = []
    fichier=open(nomFichier, "r")
    for ligne in fichier.readlines():        
        if not ligne:
            break
        else:
            listeIDgenesFichier.append(ligne)
    fichier.close()
    return listeIDgenesFichier


def listeToString(listeIDgenesFichier):
    genesString = ""
    for gene in listeIDgenesFichier:
        genesString = genesString + gene
    return genesString


def sendToUniprot(genesString):
    url = 'http://www.uniprot.org/uploadlists/'
    
    params = {
        'from':'GENENAME',
        'to':'ID',
        'format':'tab',
        'query':genesString
    }
    
    data = urllib.urlencode(params)
    request = urllib2.Request(url, data)
    contact = "" # Please set your email address here to help us debug in case of problems.
    request.add_header('User-Agent', 'Python %s' % contact)
    response = urllib2.urlopen(request)
    page = response.read(200000)
    return page

def recupererUniprotIDs(page):
    listeIDsUniprot = []
    for ligne in page:
        tableLigne = ligne.split(' ')
        listeIDsUniprot.append(tableLigne[1])
    return listeIDsUniprot

def sauverFichier(nomFichier, listeIDsUniprot):
    #sauver les id uniprot
    nomFichierFin = nomFichier,".uniprot"
    fichier=open(nomFichierFin, "w")
    for item in listeIDsUniprot:
        fichier.write(item,'\n')
    fichier.close()

#GENENAME CAALFM_C208370CA OK pour albicans
nomFichier = "example_genes_glabrata.txt" #GENENAME
#nomFichier = "example_genes_lusitaniae.txt" #GENENAME A9F13_10g01430 pourrait marcher
liste_genes = chargerListeIDgenes(nomFichier)
string_genes = listeToString(liste_genes)
#print string_genes
table = sendToUniprot(string_genes)
print table
