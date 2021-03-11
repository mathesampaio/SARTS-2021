from chartjs.views.lines import BaseLineChartView, HighchartPlotLineChartView
from django.shortcuts import render
from django.contrib import messages
from .forms import ContatoForms
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_protect

from django.conf import settings
'''#produção'''
#your_static_root = settings.STATIC_ROOT
'''local'''
your_static_root = 'core' + settings.STATIC_URL


@csrf_protect
def get(request):
    mini_bacia = int(request.GET.get("mini_bacia"))
    print(mini_bacia)

    path1 = your_static_root

    if mini_bacia <= 27467:
        pathFileQ = '/vazoes/dados_mini1.txt'
    elif mini_bacia <= 29620:
        pathFileQ = '/vazoes/dados_mini2.txt'
    elif mini_bacia <= 31630:
        pathFileQ = '/vazoes/dados_mini3.txt'
    elif mini_bacia <= 33631:
        pathFileQ = '/vazoes/dados_mini4.txt'
    elif mini_bacia <= 33749:
        pathFileQ = '/vazoes/dados_mini5.txt'

    # pathFileQ1 = '/vazoes/um_ano.csv'

    pathFileQ1 = path1 + pathFileQ
    FileQ = open(pathFileQ1, 'r')  # Abre o arquivo
    lines = FileQ.readlines()

    data = lines[0]
    data_list = data.split(";")  # Criando uma lista com as datas

    vazao = []  # Criando uma lisca com as mini + vazões
    for i in range(1, len(lines)):
        vazao.append(lines[i])

    aux = []
    db_data=[]
    for i in range(len(vazao)):
        if str(mini_bacia) == vazao[i].split(";")[0]:  # AQUI VE SELECIONA A VAZÃO DA MINI ESCOLHIDA
            aux = (vazao[i].split(";"))
    for i in range(1, len(aux)):
        db_data.append(
            {'datetime': (data_list[i]),
             'time_series': (float(aux[i])),
             'cod': mini_bacia,
            })
    #print(db_data)
    return JsonResponse(list(db_data), safe=False)






class DadosJSONView(BaseLineChartView):

    def get(self, request):

        self.mini_bacia = int(request.GET.get("mini_bacia"))

        path1 = your_static_root

        """AQUI FAZEMOS A BUSCA NO BANCO DE DADOS"""
        if self.mini_bacia <= 27467:
            pathFileQ = '/vazoes/dados_mini1.txt'
        elif self.mini_bacia <= 29620:
            pathFileQ = '/vazoes/dados_mini2.txt'
        elif self.mini_bacia <= 31630:
            pathFileQ = '/vazoes/dados_mini3.txt'
        elif self.mini_bacia <= 33631:
            pathFileQ = '/vazoes/dados_mini4.txt'
        elif self.mini_bacia <= 33749:
            pathFileQ = '/vazoes/dados_mini5.txt'

        #pathFileQ1 = '/vazoes/um_ano.csv'

        pathFileQ1 = path1 + pathFileQ
        FileQ = open(pathFileQ1, 'r')  # Abre o arquivo
        lines = FileQ.readlines()

        data = lines[0]
        data_list = data.split(";")  # Criando uma lista com as datas

        vazao = []  # Criando uma lisca com as mini + vazões
        for i in range(1, len(lines)):
            vazao.append(lines[i])

        aux = []
        self.vaza_sele = [[]]
        self.data_sele = []

        for i in range(len(vazao)):
            if str(self.mini_bacia) == vazao[i].split(";")[0]:  # AQUI VE SELECIONA A VAZÃO DA MINI ESCOLHIDA
                aux = (vazao[i].split(";"))
        for i in range(1, len(aux)):
            self.vaza_sele[0].append(float(aux[i]))  # AQUI VE SALVA A VAZÃO
            self.data_sele.append(data_list[i])
        return self.render_to_response({"labels": self.get_labels(), "datasets": self.get_datasets()})

    def get_dataset_options(self, index, color):
        default_opt = {

            "responsive": True,
            "backgroundColor": "#013565",
            "fill": False,
            "borderWidth": 2,
            "borderColor": "#013565",
            "pointBackgroundColor": "#013565",
            "pointBorderColor": "#013565",
            "radius": 1,
        }
        return default_opt
    def get_labels(self):
        labels = self.data_sele
        return labels

    def get_providers(self):
        """retorna os nomes dos datasets"""
        datasets = ["Mini Bacia:" + str(self.mini_bacia)]
        return datasets

    def get_data(self):
        dados = self.vaza_sele

        return dados



def index(request):
    return render(request, 'index.html')

def mapa(request):
    return render(request, 'mapa.html')

def grafico(request):
    return render(request, 'grafico.html')

def teste(request):
    return render(request, 'teste.html')

def contato(request):
    form = ContatoForms(request.POST or None)

    if str(request.method) == 'POST':
        if form.is_valid():
            form.send_mail()

            messages.success(request, "E-mail enviado com Sucesso!")
            form = ContatoForms()

        else:
            messages.error(request, "Erro ao enviar E-mail""")
    context = {
        'form': form
    }
    return render(request, 'contato.html', context)

