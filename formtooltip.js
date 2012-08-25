/*
    Form Tooltip
    @description 
    @version 0.1
*/

(function($) {
    var defaults = {
        width:200,
        html: function(field){ return 'lorem ipsum' },
        offsetX:0,
        offsetY:0,
        offsetElement:null,
        container: function() { return $('body'); }
    };

    function FormTooltip (fields, options) {
        // plugin options
        if ( options ) {
            // extend options
            this.options = $.extend(defaults, options); 
        } else {
            // use default options
            this.options = defaults;
        };
        
        // elements
        this.elements = [];
        this.elements.$tooltip = $('<div>', { 'class' : 'form-tooltip', css: { 'position' : 'absolute',  width: this.options.width } });
        this.elements.$fields = fields;
        this.elements.offsetElement = this.options.offsetElement;
        
        // initialize hidden
        this.elements.$tooltip.hide();
        
        // add tooltip element to page body
        this.options.container().append(this.elements.$tooltip);
        
        this.elements.$fields.bind('focus', $.proxy(this._show, this));
        this.elements.$fields.bind('blur', $.proxy(this.hide, this));
    };
    
    FormTooltip.prototype = {
        // show tooltip
        show: function(field, content){
            var fieldX, fieldY, offsetElementPos;
            if ( !this.options.offsetElement ) {
                this.elements.$tooltip.addClass('form-tooltip-position-right');
                fieldX = field.offset().left + field.innerWidth() + this.options.offsetX;
            } else {
                offsetElementPos = this.elements.offsetElement.position();
                offsetElementPos = this.elements.offsetElement.offset();
                
                if ( ( field.offset().left + field.width() + this.elements.$tooltip.innerWidth() + this.options.offsetX ) > ( offsetElementPos.left + this.elements.offsetElement.innerWidth() ) ) {
                    fieldX = field.offset().left - this.elements.$tooltip.innerWidth() + this.options.offsetX;
                    this.elements.$tooltip.addClass('form-tooltip-position-left');
                    this.elements.$tooltip.removeClass('form-tooltip-position-right');
                } else {
                    fieldX = field.offset().left + field.innerWidth() + this.options.offsetX;
                    this.elements.$tooltip.addClass('form-tooltip-position-right');
                    this.elements.$tooltip.removeClass('form-tooltip-position-left');                    
                }
            };
            
            fieldY = field.offset().top  + this.options.offsetY;
            this.elements.$tooltip.css({'top' : fieldY, 'left' : fieldX});
            this.elements.$tooltip.empty().html( content || this.options.html(field) );
            this.elements.$tooltip.show();
        },
        
        // private show
        _show: function(event){
            var field = $(event.target);
            this.show(field);
        },
        
        // hide tooltip
        hide: function(event){
            this.elements.$tooltip.hide().empty();
        }
    }
    // init plugin
    $.fn.formTooltip = function(options) {
        this.data('formTooltipAPI', new FormTooltip(this, options));
    };

})(jQuery);