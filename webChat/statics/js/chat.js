var iNow =0
var Chat = Backbone.Model.extend({
	urlRoot :'',
	defaults:{
		content:'',
		username:'',
		date:''
	},
	clear : function(){
		this.destroy();
	}
})

var ChatList = Backbone.Collection.extend({
	url: 'chat/',
	model : Chat
})

var ChatView = Backbone.View.extend({
	tagName : 'li',
	template: _.template( $('#item-template').html() ),
	events:{
		'click #destroy' : 'clear'
	},

	initialize: function(){
		_.bindAll(this, 'render','remove');
		//console.log(this);
		this.model.bind('change',this.render);
		this.model.bind('destroy',this.clear); /*remove?*/
	},

	render : function(){
		$(this.el).html( this.template( this.model.toJSON()) )
		console.log(this);
		return this;
	},

	clear : function(){   //clear ???????
		this.model.clear();
	}
})

var AppView = Backbone.View.extend({
	el: $('.main'),
	events : {
		'click #send':'say',
		'click #destroy' : 'delSay'
	},
	initialize : function(){
		_.bindAll(this, 'addOne','addAll');
		//console.log(this);
		this.nickname = this.$('#nickname');
		this.textarea = this.$('#content');

		chatList.bind('add', this.addOne);
		chatList.bind('reset',this.addAll);
		chatList.fetch();
		setInterval(function(){
			chatList.fetch({
				add: true,
				success: function(res){
					console.log('res');
				}
			});
		}, 1000)
	},

	addOne : function(chat){   // chat???????

		if(!chat.isNew()){

			var view = new ChatView({model:chat});

			this.$('.chat_list').append(view.render().el);
			$('.screen').scrollTop( $('.chat_list').height() +200 );
		}
	},

	addAll : function(){
		chatList.each(this.addOne);
	},

	say : function(){
		chatList.create(this.newAttributes());
		//this.textarea.text('');
		this.textarea.val('');
		this.nickname.val('');
		//this.textarea.html('');
		
	},

	newAttributes : function(){
		var cont = this.textarea.val();
		//console.log(this.textarea);
		/*if(content == ''){
			content = this.textarea.text();
		}*/
		return {
			content : cont,
			username : this.nickname.val(),
			date : get_time()
		}
	},

	delSay : function(e){
		console.log(e.currentTarget);
		$(e.currentTarget).parent().parent().remove();
	}
})

var chatList = new ChatList;

var appView = new AppView;


function get_time(){
	var today,hour,second,minute,year,month,date,time;
		today = new Date();
		year = today.getFullYear();
		month = today.getMonth() + 1;
		date = today.getDate();
		hour = today.getHours();
		minute = today.getMinutes();
		second = today.getSeconds();
		if(minute<10){
			minute = '0' + minute;
		}
		if(second<10){
			second = '0' + second;
		}

		time = year + '-' + month + '-' + date + ' '+hour + ':' + minute + ':' + second;
		console.log(time);   //服务器时间问题
		return time;
}