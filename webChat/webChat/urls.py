from django.conf.urls import patterns, include, url

from django.contrib import admin
#from views import direct_to_template
import settings
from chat import views_chat
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'webChat.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

     #(r'^site_media/(?P.*)$', 'django.views.static.serve',{'document_root': settings.STATIC_DOC_ROOT,'show_indexes': False}),
     (r'^chat/$', views_chat.chat),
     (r'^chat/(\w+)$', views_chat.chatDelete), 
     (r'^$', views_chat.loadpage),
)
