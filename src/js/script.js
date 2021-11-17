$.fn.extend({
	printElement: function() {
		var frameName = 'printIframe';
		var doc = window.frames[frameName];
		if (!doc) {
			$('<iframe>').hide().attr('name', frameName).appendTo(document.body);
			doc = window.frames[frameName];
		}
		doc.document.body.innerHTML = this.html();
		doc.window.print();
		return this;
	}
});

$.fn.Tabs = function() {
	var selector = this;

	this.each(function() {
		var obj = $(this); 
		$(obj.attr('href')).hide();
		$(obj).click(function() {
			$(selector).removeClass('selected');
			
			$(selector).each(function(i, element) {
				$($(element).attr('href')).hide();
			});
			
			$(this).addClass('selected');
			$($(this).attr('href')).fadeIn();
			return false;
		});
	});

	$(this).show();
	$(this).first().click();
	if(location.hash!='' && $('a[href="' + location.hash + '"]').length)
		$('a[href="' + location.hash + '"]').click();	
};


 jQuery.validator.setDefaults({
  errorClass: 'invalid',
	successClass: 'valid',
	focusInvalid: false,
	errorElement: 'span',
	errorPlacement: function (error, element) {
    if ( element.parent().hasClass('jq-checkbox') ||  element.parent().hasClass('jq-radio')) {
      element.closest('label').after(error);
      
    } else if (element.parent().hasClass('jq-selectbox')) {
      element.closest('.jq-selectbox').after(error);
    } else {
      error.insertAfter(element);
    }
  },
  highlight: function(element, errorClass, validClass) {
    if ( $(element).parent().hasClass('jq-checkbox') ||  $(element).parent().hasClass('jq-radio') || $(element).parent().hasClass('jq-selectbox')) {
    	$(element).parent().addClass(errorClass).removeClass(validClass);
    } else {
    	$(element).addClass(errorClass).removeClass(validClass);
    }
  },
  unhighlight: function(element, errorClass, validClass) {
  	if ( $(element).parent().hasClass('jq-checkbox') ||  $(element).parent().hasClass('jq-radio') || $(element).parent().hasClass('jq-selectbox')) {
    	$(element).parent().removeClass(errorClass).addClass(validClass);
    } else {
    	$(element).removeClass(errorClass).addClass(validClass);
    }
  }
});
//дефолтные сообщения, предупреждения
jQuery.extend(jQuery.validator.messages, {
  required: "Majburiy maydon",
  email: "Noto'g'ri elektron pochta manzili",
  url: "Некорректный URL",
  number: "Некорректный номер",
  digits: "Это поле поддерживает только числа",
  equalTo: "Parollar mos kelmayapti",
  maxlength: jQuery.validator.format('Maksimal maydon uzunligi {0}'),
  minlength: jQuery.validator.format('Minimal maydon uzunligi	{0}'),
  require_from_group: jQuery.validator.format('Отметьте миниммум {0} из этих полей')
});
//кастомные методы валидатора
jQuery.validator.addMethod("lettersonly", function(value, element) {
  return this.optional(element) || /^[a-zA-ZА-Яа-я\s]+$/i.test(value);
}, "Только буквы");

jQuery.validator.addMethod("telephone", function(value, element) {
  return this.optional(element) || /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){6,14}(\s*)?$/i.test(value);
}, "Yaroqsiz format"); 



const FARBA = {
	//функция для навешивания изображений фоном
	backgrounded (selector) {
		$(selector).each(function(){
			var $this = $(this),
			$src = $this.find('.ui-backgrounded-bg').attr('src');
			if($this.find('.ui-backgrounded-bg').length) {
				$this.addClass('backgrounded').css('backgroundImage','url('+$src+')');
			}
		});
	},

	//lazy load для сторонних либ
	lazyLibraryLoad(scriptSrc,linkHref,callback) {
		let script
    const domScript = document.querySelector(`script[src="${scriptSrc}"]`)

    if (!domScript) {
      script = document.createElement('script');
      script.src = scriptSrc;
      document.querySelector('#wrapper').after(script);
    }
		
	
		if (linkHref !== '') {
			let style = document.createElement('link');
			style.href = linkHref;
			style.rel = 'stylesheet';
			document.querySelector('link').before(style);
		}
    
    if (!domScript) {
      script.onload = callback
    } else {
      domScript.onload = callback
    }
	}
}


const Store = {
	files: [],
	removeFile: function(index) {
	  this.files.splice(index, 1);
	},
	addFiles: function(files) {
	  this.files = this.files.concat(files);
	},
	readURL: function(e,input,block) {
		const that = this;
		if (!e.target.files.length) { return }
	  const files = Object.keys(e.target.files).map((i) => e.target.files[i]);
	  that.addFiles(files);

	  for (var i = 0; i < that.files.length; i++) {
			var reader = new FileReader();
			$(block).find('.ui-files-preview').remove();
			reader.onload = function (e) {
				var image = document.createElement('img');
				var span = document.createElement('span');
				image.setAttribute('src',e.target.result);
				span.setAttribute('class','ui-files-preview');
				span.setAttribute('data-index',i);
				span.appendChild(image);
				$(span).append('<i class="ui-files-preview-delete"></i>');
				$(block).append(span);
			};
			reader.readAsDataURL(that.files[i]);
		}
	  e.target.value = '';
	},
	generateFormData: function(formData) {
		// const formData = new FormData();
		this.files.map((file, index) => {
				formData.append(`file${index + 1}`, file);
		});
		// return formData;
	}
}


jQuery(document).ready(function($){

	$('.header-profile-toggler').on('click',function(e){
		$(this).toggleClass('opened')
		$('.header-profile-drop').toggleClass('opened')
	});
	$(document).on('mouseup',function(e){
		if ($('.header-profile').has(e.target).length === 0){
			$('.header-profile-drop, .header-profile-toggler').removeClass('opened');
		}
	});

	$('.header-courses-btn').on('click',function(e){
		$(this).toggleClass('opened')
		$('.header-courses-drop').toggleClass('opened')
	});
	$(document).on('mouseup',function(e){
		if ($('.header-courses').has(e.target).length === 0){
			$('.header-courses-drop, .header-courses-btn').removeClass('opened');
		}
	});


	$('.ux-tabs a').Tabs();

	
	$('.lessons-group-title').on('click', function(e){
		e.preventDefault();
		$(this).toggleClass('closed');
		$(this).next('.lessons-group-body').toggleClass('closed');
	})


	$(document).on('click','.ux-input-typetoggler',function(e) {
		e.preventDefault();
		const input = $(this).parent().find('input.ui-input')
		const type = input.attr('type')
		type == 'password'
			? input.attr('type','text')
			: input.attr('type','password')
	})


	$('form.form_profile').validate({
		rules: {
			email: {
				email: true
			},
			phone: {
				telephone: true
			}
		}
	})


	$('form.form_profile_passwords').validate({
		rules: {
			oldpass: {
				minlength: 8,
			},
			newpass: {
				minlength: 8,
				equalTo: $('.form_profile_passwords input[name="oldpass"]')
			},
			retrypass: {
				minlength: 8,
				equalTo: $('.form_profile_passwords input[name="newpass"]')
			}
		}
	})


	$(document).on('click','.mfp-custom-close',function(e){
		e.preventDefault();
		$.magnificPopup.close();
	});
   

	//инициализация MFP popup для форм
	$(document).on('click','.mfp-link',function(){
		var a = $(this);
		$.magnificPopup.open({
			items: { src: a.attr('data-href') },
			type: 'ajax',    
			overflowY: 'scroll',
			removalDelay: 300,
			mainClass: 'my-mfp-zoom-in',
			ajax: {
				tError: 'Error. Not valid url',
			}
		});
		return false;
	});
	


	//стилизация элементов форм
	$('.ux-styler').styler({
		// singleSelectzIndex: '1',
	});


});//ready close

if (document.querySelector('.ux-mask-date')) {
	FARBA.lazyLibraryLoad(
		'https://cdnjs.cloudflare.com/ajax/libs/imask/6.2.2/imask.min.js',
		'',
		() => {
			const masks = document.querySelectorAll('.ux-mask-date')
			const maskOptions = {
				mask: Date,
				pattern: '`d.`m.Y', 
				blocks: {
					d: {
						mask: IMask.MaskedRange,
						from: 1,
						to: 31,
						maxLength: 2,
					},
					m: {
						mask: IMask.MaskedRange,
						from: 1,
						to: 12,
						maxLength: 2,
					},
					Y: {
						mask: IMask.MaskedRange,
						from: 1900,
						to: 2999,
					}
				}
			}
			masks.forEach(el => {
        IMask(el, maskOptions)
      })
		}
	)
}

if (document.querySelector('.ux-mask-phone')) {
  FARBA.lazyLibraryLoad(
    '//cdnjs.cloudflare.com/ajax/libs/imask/6.2.2/imask.min.js',
    '',
    () => {
      const masks = document.querySelectorAll('.ux-mask-phone')
      const maskOptions = {
        mask: '000 00 000 00 00',
        // mask: '+{000} 00 000 00 00',
        // lazy: false,
      }
      masks.forEach(el => {
        IMask(el, maskOptions)
      })
    }
  )
}


if (document.querySelector('.ux-share')) {
	FARBA.lazyLibraryLoad(
		'//yastatic.net/share2/share.js',
		'',
		() => {
			var myShare = document.querySelector('.ux-share')
			var share = Ya.share2(myShare)
		}
	)
}