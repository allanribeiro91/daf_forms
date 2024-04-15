from django.shortcuts import render

# Create your views here.
def form_modelform(request)
     if request.method =="GET"
          form = qualifarsus
          context = {
               'form': form
          }
          
          return render(request, "", context=context)
     else:
          form = MunicipioForm(request.POST)
          if form.is_valid():
          
          context = {
               'form': form
               }    
               return render(request, "", context=context)          