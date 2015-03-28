jQuery(document).ready(function($) {
    $('.level-bar-inner').css('width', '0');
    $(window).on('load', function() {
        $('.level-bar-inner').each(function() {
            var itemWidth = $(this).data('level');
            $(this).animate({
                width: itemWidth
            }, 800);
        });
    });
    $('.level-label').tooltip();
    $("#rss-feeds").rss(
        "http://hathle.tumblr.com/rss",
        {
        limit: 2,
        // valid values: 'show', 'slide', 'slideFast', 'slideSynced', 'slideFastSynced'
        effect: 'slideFastSynced',
        layoutTemplate: "<div class='item'>{entries}</div>",
        entryTemplate: '<h3 class="title"><a href="{url}" target="_blank">{title}</a></h3><div><p>{shortBodyPlain}</p><a class="more-link" href="{url}" target="_blank"><i class="fa fa-external-link"></i>Read more</a></div>'
        }
    );

    $("#modal-open").click(function() {
    	$("body").append('<div id="modal-overlay"></div>');
    	$("#modal-overlay").fadeIn("slow");
    	centeringModalSyncer();
    	$("#modal-content").fadeIn("slow");

    	$("#modal-overlay,#modal-close").unbind().click(function() {
    		$("#modal-content,#modal-overlay").fadeOut("slow",function() {
    			$('#modal-overlay').remove();
    		});
            $('.form-control').val("");
    	});
    });

    $(window).resize(centeringModalSyncer);

	function centeringModalSyncer(){
		var w = $(window).width();
		var h = $(window).height();
		var cw = $("#modal-content").outerWidth();
		var ch = $("#modal-content").outerHeight();

		$("#modal-content").css({
            "left": ((w - cw) / 2) + "px",
            "top": ((h - ch) / 2) + "px"
        })

        if(w < 750) {
    		$("#modal-content").css({
                "width": "100%"
            })
        }
        else {
    		$("#modal-content").css({
                "width": "50%"
            })
        }
	}

    var milkcocoa = new MilkCocoa("https://io-ui5w7yucf.mlkcca.com");
    var mesDS = milkcocoa.dataStore('contact');

    $('.contact_submit').on('click', function(){
        var name = $('input[name=contact_name]').val(),
            email = $('input[name=contact_email]').val(),
            body = $('textarea[name=contact_body]').val();

        var mes = '';
        if(!name) mes += 'お名前 ';
        if(!email) mes += 'メールアドレス ';
        if(!body) mes += 'メッセージ ';

        if(!name || !email || !body){
            mes += 'が入力されていません。';
        }
        else {
            pushContact({
                name : name,
                email : email,
                body : body
            });
            mes = '送信しました。';

    		$("#modal-content,#modal-overlay").fadeOut("slow",function() {
    			$('#modal-overlay').remove();
    		});
            $('.form-control').val("");
        }
    });

    function pushContact(body) {
        mesDS.push(body,function(data) {
            console.log(data);
        });
    }

});
