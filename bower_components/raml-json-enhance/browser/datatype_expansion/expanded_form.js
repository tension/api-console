goog.provide("datatype_expansion.expanded_form"),goog.require("cljs.core"),goog.require("clojure.string"),goog.require("datatype_expansion.utils"),goog.require("instaparse.core"),goog.require("clojure.walk"),cljs.core.enable_console_print_BANG_(),datatype_expansion.expanded_form.raml_grammar="TYPE_EXPRESSION = TYPE_NAME | SCALAR_TYPE | <'('> <BS>  TYPE_EXPRESSION <BS> <')'> | ARRAY_TYPE | UNION_TYPE\n                   SCALAR_TYPE = 'string' | 'number' | 'integer' | 'boolean' | 'date-only' | 'time-only' | 'datetime-only' | 'datetime' | 'file' | 'nil'\n                   ARRAY_TYPE = TYPE_EXPRESSION <'[]'>\n                   TYPE_NAME = #\"(\\w[\\w\\d]+\\.)*\\w[\\w\\d]+\"\n                   UNION_TYPE = TYPE_EXPRESSION <BS> (<'|'> <BS> TYPE_EXPRESSION)+\n                   BS = #\"\\s*\"\n                   ",datatype_expansion.expanded_form.default_type="any",datatype_expansion.expanded_form.raml_type_grammar_analyser=instaparse.core.parser(datatype_expansion.expanded_form.raml_grammar),datatype_expansion.expanded_form.ast__GT_type=function e(c,r){for(;;){var s=cljs.core.filterv(function(e,c){return function(e){return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(e,cljs.core.cst$kw$TYPE_EXPRESSION)}}(c,r),c);{if(!cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(1,cljs.core.count(s))||!cljs.core.vector_QMARK_(cljs.core.first(s))){var $=cljs.core._EQ_,o=cljs.core.first(s);return cljs.core.truth_($.cljs$core$IFn$_invoke$arity$2?$.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$UNION_TYPE,o):$.call(null,cljs.core.cst$kw$UNION_TYPE,o))?new cljs.core.PersistentArrayMap(null,2,[cljs.core.cst$kw$type,"union",cljs.core.cst$kw$anyOf,cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(function(c,r,s,$,o){return function(c){return e(c,r)}}(c,r,$,o,s),cljs.core.rest(s))],null):cljs.core.truth_($.cljs$core$IFn$_invoke$arity$2?$.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$SCALAR_TYPE,o):$.call(null,cljs.core.cst$kw$SCALAR_TYPE,o))?new cljs.core.PersistentArrayMap(null,1,[cljs.core.cst$kw$type,cljs.core.last(s)],null):cljs.core.truth_($.cljs$core$IFn$_invoke$arity$2?$.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$ARRAY_TYPE,o):$.call(null,cljs.core.cst$kw$ARRAY_TYPE,o))?new cljs.core.PersistentArrayMap(null,2,[cljs.core.cst$kw$type,"array",cljs.core.cst$kw$items,e(cljs.core.last(s),r)],null):cljs.core.truth_($.cljs$core$IFn$_invoke$arity$2?$.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$TYPE_NAME,o):$.call(null,cljs.core.cst$kw$TYPE_NAME,o))?cljs.core.last(s):datatype_expansion.utils.error([cljs.core.str("Cannot parse type expression AST "),cljs.core.str(cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.identity,s))].join(""))}var n=cljs.core.first(s),t=r;c=n,r=t}}},datatype_expansion.expanded_form.parse_type_expression=function(e,c){try{return datatype_expansion.expanded_form.ast__GT_type(datatype_expansion.expanded_form.raml_type_grammar_analyser.cljs$core$IFn$_invoke$arity$1?datatype_expansion.expanded_form.raml_type_grammar_analyser.cljs$core$IFn$_invoke$arity$1(e):datatype_expansion.expanded_form.raml_type_grammar_analyser.call(null,e),c)}catch(e){if(e instanceof Error){return null}throw e}},datatype_expansion.expanded_form.atomic_types=new cljs.core.PersistentHashSet(null,new cljs.core.PersistentArrayMap(null,11,["boolean",null,"string",null,"time-only",null,"any",null,"number",null,"datetime",null,"date-only",null,"integer",null,"datetime-only",null,"file",null,"nil",null],null),null),datatype_expansion.expanded_form.collect_facets_constraints=function e(c){var r=cljs.core.get.cljs$core$IFn$_invoke$arity$3(c,cljs.core.cst$kw$facets,cljs.core.PersistentArrayMap.EMPTY),s=function(){var e=cljs.core.keys(r);return cljs.core.truth_(e)?e:cljs.core.PersistentVector.EMPTY}();return cljs.core.map_QMARK_(cljs.core.cst$kw$type.cljs$core$IFn$_invoke$arity$1(c))?cljs.core.concat.cljs$core$IFn$_invoke$arity$2(s,e(cljs.core.cst$kw$type.cljs$core$IFn$_invoke$arity$1(c))):cljs.core.coll_QMARK_(cljs.core.cst$kw$type.cljs$core$IFn$_invoke$arity$1(c))?cljs.core.concat.cljs$core$IFn$_invoke$arity$2(s,cljs.core.flatten(cljs.core.map.cljs$core$IFn$_invoke$arity$2(e,cljs.core.cst$kw$type.cljs$core$IFn$_invoke$arity$1(c)))):s},datatype_expansion.expanded_form.process_user_facets_constraints=function(e,c){var r=datatype_expansion.expanded_form.collect_facets_constraints(c),s=cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(function(e){return function(e){return new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[e,e.cljs$core$IFn$_invoke$arity$1?e.cljs$core$IFn$_invoke$arity$1(c):e.call(null,c)],null)}}(r),r));return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([e,s],0))},datatype_expansion.expanded_form.process_constraints=function(e,c){return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(datatype_expansion.expanded_form.process_user_facets_constraints(e,c),cljs.core.cst$kw$required,cljs.core.some_QMARK_(cljs.core.cst$kw$required.cljs$core$IFn$_invoke$arity$1(c))?cljs.core.cst$kw$required.cljs$core$IFn$_invoke$arity$1(c):null),cljs.core.cst$kw$xml,cljs.core.cst$kw$xml.cljs$core$IFn$_invoke$arity$1(c)),cljs.core.cst$kw$fileTypes,cljs.core.cst$kw$fileTypes.cljs$core$IFn$_invoke$arity$1(c)),cljs.core.cst$kw$example,cljs.core.cst$kw$example.cljs$core$IFn$_invoke$arity$1(c)),cljs.core.cst$kw$description,cljs.core.cst$kw$description.cljs$core$IFn$_invoke$arity$1(c)),cljs.core.cst$kw$displayName,cljs.core.cst$kw$displayName.cljs$core$IFn$_invoke$arity$1(c)),cljs.core.cst$kw$default,cljs.core.cst$kw$default.cljs$core$IFn$_invoke$arity$1(c)),cljs.core.cst$kw$examples,cljs.core.cst$kw$examples.cljs$core$IFn$_invoke$arity$1(c)),cljs.core.cst$kw$title,cljs.core.cst$kw$title.cljs$core$IFn$_invoke$arity$1(c)),cljs.core.cst$kw$minProperties,cljs.core.cst$kw$minProperties.cljs$core$IFn$_invoke$arity$1(c)),cljs.core.cst$kw$maxProperties,cljs.core.cst$kw$maxProperties.cljs$core$IFn$_invoke$arity$1(c)),cljs.core.cst$kw$discriminator,cljs.core.cst$kw$discriminator.cljs$core$IFn$_invoke$arity$1(c)),cljs.core.cst$kw$discriminatorValue,cljs.core.cst$kw$discriminatorValue.cljs$core$IFn$_invoke$arity$1(c)),cljs.core.cst$kw$minLength,cljs.core.cst$kw$minLength.cljs$core$IFn$_invoke$arity$1(c)),cljs.core.cst$kw$maxLength,cljs.core.cst$kw$maxLength.cljs$core$IFn$_invoke$arity$1(c)),cljs.core.cst$kw$minimum,cljs.core.cst$kw$minimum.cljs$core$IFn$_invoke$arity$1(c)),cljs.core.cst$kw$maximum,cljs.core.cst$kw$maximum.cljs$core$IFn$_invoke$arity$1(c)),cljs.core.cst$kw$format,cljs.core.cst$kw$format.cljs$core$IFn$_invoke$arity$1(c)),cljs.core.cst$kw$multipleOf,cljs.core.cst$kw$multipleOf.cljs$core$IFn$_invoke$arity$1(c)),cljs.core.cst$kw$pattern,cljs.core.cst$kw$pattern.cljs$core$IFn$_invoke$arity$1(c)),cljs.core.cst$kw$uniqueItems,cljs.core.cst$kw$uniqueItems.cljs$core$IFn$_invoke$arity$1(c)),cljs.core.cst$kw$minItems,cljs.core.cst$kw$minItems.cljs$core$IFn$_invoke$arity$1(c)),cljs.core.cst$kw$maxItems,cljs.core.cst$kw$maxItems.cljs$core$IFn$_invoke$arity$1(c)),cljs.core.cst$kw$enum,function(){var e=cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.cst$kw$enum.cljs$core$IFn$_invoke$arity$1(c));return cljs.core.empty_QMARK_(e)?null:e}()),cljs.core.cst$kw$additionalProperties,cljs.core.cst$kw$additionalProperties.cljs$core$IFn$_invoke$arity$2(c,!(!cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("object",cljs.core.cst$kw$type.cljs$core$IFn$_invoke$arity$1(e))&&!cljs.core.some_QMARK_(cljs.core.cst$kw$properties.cljs$core$IFn$_invoke$arity$1(e)))||null))},datatype_expansion.expanded_form.xml_type_QMARK_=function(e){return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(e,"xml")||"string"==typeof e&&clojure.string.starts_with_QMARK_(e,"<?xml")},datatype_expansion.expanded_form.json_type_QMARK_=function(e){return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(e,"json")||"string"==typeof e&&clojure.string.starts_with_QMARK_(e,"{")},datatype_expansion.expanded_form.setup_context=function(e){var c=e,r=null==c||!(64&c.cljs$lang$protocol_mask$partition0$||c.cljs$core$ISeq$)?c:cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,c),s=r;cljs.core.get.cljs$core$IFn$_invoke$arity$2(r,cljs.core.cst$kw$path);return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(s,cljs.core.cst$kw$path,cljs.core.PersistentVector.EMPTY,cljs.core.array_seq([cljs.core.cst$kw$fixpoints,function(){var e=cljs.core.PersistentArrayMap.EMPTY;return cljs.core.atom.cljs$core$IFn$_invoke$arity$1?cljs.core.atom.cljs$core$IFn$_invoke$arity$1(e):cljs.core.atom.call(null,e)}()],0))},datatype_expansion.expanded_form.cycle_QMARK_=function(e,c){return cljs.core.some_QMARK_(cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(function(c){return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c,e)},c)))},datatype_expansion.expanded_form.process_items=function(e,c){return cljs.core.some_QMARK_(cljs.core.cst$kw$items.cljs$core$IFn$_invoke$arity$1(e))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(e,cljs.core.cst$kw$items,function(){var r=cljs.core.cst$kw$items.cljs$core$IFn$_invoke$arity$1(e),s=c;return datatype_expansion.expanded_form.expanded_form_inner.cljs$core$IFn$_invoke$arity$2?datatype_expansion.expanded_form.expanded_form_inner.cljs$core$IFn$_invoke$arity$2(r,s):datatype_expansion.expanded_form.expanded_form_inner.call(null,r,s)}()):e},datatype_expansion.expanded_form.process_properties=function(e){for(var c=[],r=arguments.length,s=0;;){if(!(s<r))break;c.push(arguments[s]);var $=s+1;s=$}var o=c.length;switch(o){case 2:return datatype_expansion.expanded_form.process_properties.cljs$core$IFn$_invoke$arity$2(arguments[0],arguments[1]);case 3:return datatype_expansion.expanded_form.process_properties.cljs$core$IFn$_invoke$arity$3(arguments[0],arguments[1],arguments[2]);default:throw new Error([cljs.core.str("Invalid arity: "),cljs.core.str(c.length)].join(""))}},datatype_expansion.expanded_form.process_properties.cljs$core$IFn$_invoke$arity$2=function(e,c){return datatype_expansion.expanded_form.process_properties.cljs$core$IFn$_invoke$arity$3(e,c,cljs.core.cst$kw$properties)},datatype_expansion.expanded_form.process_properties.cljs$core$IFn$_invoke$arity$3=function(e,c,r){return cljs.core.some_QMARK_(r.cljs$core$IFn$_invoke$arity$1?r.cljs$core$IFn$_invoke$arity$1(e):r.call(null,e))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(e,r,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(function(e){var r=e,s=cljs.core.nth.cljs$core$IFn$_invoke$arity$3(r,0,null),$=cljs.core.nth.cljs$core$IFn$_invoke$arity$3(r,1,null),o=datatype_expansion.expanded_form.expanded_form_inner.cljs$core$IFn$_invoke$arity$2?datatype_expansion.expanded_form.expanded_form_inner.cljs$core$IFn$_invoke$arity$2($,c):datatype_expansion.expanded_form.expanded_form_inner.call(null,$,c),n=cljs.core.map_QMARK_($)&&cljs.core.some_QMARK_(cljs.core.cst$kw$required.cljs$core$IFn$_invoke$arity$1($)),t=clojure.string.ends_with_QMARK_(cljs.core.name(s),"?"),l=n?cljs.core.name(s):clojure.string.replace(cljs.core.name(s),/\?$/,""),a=t&&!n?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(o,cljs.core.cst$kw$required,!1):cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(o,cljs.core.cst$kw$required,!n||cljs.core.cst$kw$required.cljs$core$IFn$_invoke$arity$1($));return new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[l,a],null)},r.cljs$core$IFn$_invoke$arity$1?r.cljs$core$IFn$_invoke$arity$1(e):r.call(null,e)))):e},datatype_expansion.expanded_form.process_properties.cljs$lang$maxFixedArity=3,datatype_expansion.expanded_form.process_user_facets=function(e,c){var r=datatype_expansion.expanded_form.process_properties.cljs$core$IFn$_invoke$arity$3(e,c,cljs.core.cst$kw$facets),s=cljs.core.cst$kw$facets.cljs$core$IFn$_invoke$arity$1(r);return null==s?r:cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(r,cljs.core.cst$kw$facets,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(function(e,c){return function(e){var c=e,r=cljs.core.nth.cljs$core$IFn$_invoke$arity$3(c,0,null),s=cljs.core.nth.cljs$core$IFn$_invoke$arity$3(c,1,null);return new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(r),new cljs.core.PersistentArrayMap(null,1,[cljs.core.cst$kw$type,cljs.core.cst$kw$type.cljs$core$IFn$_invoke$arity$1(s)],null)],null)}}(r,s),s)))},datatype_expansion.expanded_form.expanded_form_inner=function e(c,r){var s=cljs.core.map_QMARK_(c)&&cljs.core.some_QMARK_(cljs.core.cst$kw$properties.cljs$core$IFn$_invoke$arity$1(c))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(c,cljs.core.cst$kw$properties,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(function(e){var c=e,r=cljs.core.nth.cljs$core$IFn$_invoke$arity$3(c,0,null),s=cljs.core.nth.cljs$core$IFn$_invoke$arity$3(c,1,null);return new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.name(r),s],null)},cljs.core.cst$kw$properties.cljs$core$IFn$_invoke$arity$1(c)))):c,$="string"==typeof s?s:function(){var e=cljs.core.cst$kw$type.cljs$core$IFn$_invoke$arity$1(s);return cljs.core.truth_(e)?e:cljs.core.cst$kw$schema.cljs$core$IFn$_invoke$arity$1(s)}();if(null==$&&null==s)return new cljs.core.PersistentArrayMap(null,1,[cljs.core.cst$kw$type,datatype_expansion.expanded_form.default_type],null);if(!cljs.core.map_QMARK_($)&&cljs.core.coll_QMARK_($))return datatype_expansion.utils.clear_node(datatype_expansion.expanded_form.process_constraints(datatype_expansion.expanded_form.process_items(datatype_expansion.expanded_form.process_user_facets(datatype_expansion.expanded_form.process_properties.cljs$core$IFn$_invoke$arity$2(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(s,cljs.core.cst$kw$type,cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(function(c,s){return function(c){return e(c,r)}}(s,$),$)),r),r),r),s));if(cljs.core.truth_(cljs.core.get.cljs$core$IFn$_invoke$arity$2(datatype_expansion.expanded_form.atomic_types,$)))return datatype_expansion.utils.clear_node(datatype_expansion.expanded_form.process_constraints(datatype_expansion.expanded_form.process_user_facets(new cljs.core.PersistentArrayMap(null,2,[cljs.core.cst$kw$type,$,cljs.core.cst$kw$facets,cljs.core.cst$kw$facets.cljs$core$IFn$_invoke$arity$1(s)],null),r),s));if(null==$&&cljs.core.some_QMARK_(cljs.core.cst$kw$items.cljs$core$IFn$_invoke$arity$1(s))||cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2($,"array"))return datatype_expansion.utils.clear_node(datatype_expansion.expanded_form.process_constraints(datatype_expansion.expanded_form.process_user_facets(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(new cljs.core.PersistentArrayMap(null,2,[cljs.core.cst$kw$type,"array",cljs.core.cst$kw$facets,cljs.core.cst$kw$facets.cljs$core$IFn$_invoke$arity$1(s)],null),cljs.core.cst$kw$items,e(cljs.core.cst$kw$items.cljs$core$IFn$_invoke$arity$2(s,new cljs.core.PersistentArrayMap(null,1,[cljs.core.cst$kw$type,datatype_expansion.expanded_form.default_type],null)),r)),r),s));if(null==$&&cljs.core.some_QMARK_(cljs.core.cst$kw$properties.cljs$core$IFn$_invoke$arity$1(s))||cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2($,"object"))return datatype_expansion.utils.clear_node(datatype_expansion.expanded_form.process_user_facets(datatype_expansion.expanded_form.process_properties.cljs$core$IFn$_invoke$arity$2(datatype_expansion.expanded_form.process_constraints(new cljs.core.PersistentArrayMap(null,3,[cljs.core.cst$kw$type,"object",cljs.core.cst$kw$facets,cljs.core.cst$kw$facets.cljs$core$IFn$_invoke$arity$1(s),cljs.core.cst$kw$properties,cljs.core.cst$kw$properties.cljs$core$IFn$_invoke$arity$1(s)],null),s),r),r));if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2($,"union"))return datatype_expansion.utils.clear_node(datatype_expansion.expanded_form.process_constraints(datatype_expansion.expanded_form.process_user_facets(new cljs.core.PersistentArrayMap(null,3,[cljs.core.cst$kw$type,"union",cljs.core.cst$kw$facets,cljs.core.cst$kw$facets.cljs$core$IFn$_invoke$arity$1(s),cljs.core.cst$kw$anyOf,cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(function(c,s){return function(c){return e(c,r)}}(s,$),cljs.core.cst$kw$anyOf.cljs$core$IFn$_invoke$arity$1(s))],null),r),s));if(cljs.core.truth_(function(){var e=cljs.core.some_QMARK_($);if(e){var c="string"==typeof $||$ instanceof cljs.core.Keyword;if(c){var s=cljs.core.get.cljs$core$IFn$_invoke$arity$2(r,cljs.core.name($));return cljs.core.truth_(s)?s:cljs.core.get.cljs$core$IFn$_invoke$arity$2(r,cljs.core.keyword.cljs$core$IFn$_invoke$arity$1($))}return c}return e}())){var o=function(){var e=cljs.core.get.cljs$core$IFn$_invoke$arity$2(r,cljs.core.name($));return cljs.core.truth_(e)?e:cljs.core.get.cljs$core$IFn$_invoke$arity$2(r,cljs.core.keyword.cljs$core$IFn$_invoke$arity$1($))}();if(null==o)throw new Error([cljs.core.str("Cannot find reference "),cljs.core.str(cljs.core.name($))].join(""));if(cljs.core.truth_(datatype_expansion.expanded_form.cycle_QMARK_(cljs.core.name($),cljs.core.cst$kw$path.cljs$core$IFn$_invoke$arity$1(r))))return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$fixpoints.cljs$core$IFn$_invoke$arity$1(r),function(e,c,r){return function(e){return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(e,r,!0)}}(o,s,$)),datatype_expansion.utils.clear_node(datatype_expansion.expanded_form.process_constraints(new cljs.core.PersistentArrayMap(null,1,[cljs.core.cst$kw$type,cljs.core.cst$kw$$recur],null),s));var n=cljs.core.get.cljs$core$IFn$_invoke$arity$2(r,cljs.core.cst$kw$path),t=cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(r,cljs.core.cst$kw$path,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(n,cljs.core.name($)));return"string"==typeof s?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(e(o,t),cljs.core.cst$kw$$ref,$):datatype_expansion.utils.clear_node(datatype_expansion.expanded_form.process_constraints(datatype_expansion.expanded_form.process_items(datatype_expansion.expanded_form.process_user_facets(datatype_expansion.expanded_form.process_properties.cljs$core$IFn$_invoke$arity$2(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.map_QMARK_(s)?s:cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$$ref,$),cljs.core.cst$kw$type,e(o,t)),t),t),t),s))}if(cljs.core.truth_(datatype_expansion.expanded_form.xml_type_QMARK_($)))return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$type.cljs$core$IFn$_invoke$arity$1(s),"xml")?s:new cljs.core.PersistentArrayMap(null,2,[cljs.core.cst$kw$type,"xml",cljs.core.cst$kw$content,$],null);if(cljs.core.truth_(datatype_expansion.expanded_form.json_type_QMARK_($)))return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$type.cljs$core$IFn$_invoke$arity$1(s),"json")?s:new cljs.core.PersistentArrayMap(null,2,[cljs.core.cst$kw$type,"json",cljs.core.cst$kw$content,$],null);if(null==$&&cljs.core.some_QMARK_(s))return datatype_expansion.utils.clear_node(datatype_expansion.expanded_form.process_constraints(datatype_expansion.expanded_form.process_user_facets(new cljs.core.PersistentArrayMap(null,2,[cljs.core.cst$kw$type,"any",cljs.core.cst$kw$facets,cljs.core.cst$kw$facets.cljs$core$IFn$_invoke$arity$1(s)],null),r),s));if(cljs.core.truth_(function(){var e="string"==typeof $;return e?cljs.core.re_matches(/^.*\?$/,$):e}()))return datatype_expansion.utils.clear_node(datatype_expansion.expanded_form.process_constraints(datatype_expansion.expanded_form.process_user_facets(new cljs.core.PersistentArrayMap(null,3,[cljs.core.cst$kw$type,"union",cljs.core.cst$kw$facets,cljs.core.cst$kw$facets.cljs$core$IFn$_invoke$arity$1(s),cljs.core.cst$kw$anyOf,new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.PersistentArrayMap(null,1,[cljs.core.cst$kw$type,clojure.string.replace($,"?","")],null),new cljs.core.PersistentArrayMap(null,1,[cljs.core.cst$kw$type,"nil"],null)],null)],null),r),s));if(cljs.core.map_QMARK_($)){var l=e(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(s,cljs.core.cst$kw$type,new cljs.core.PersistentVector(null,1,5,cljs.core.PersistentVector.EMPTY_NODE,[$],null)),r);return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(datatype_expansion.utils.clear_node(datatype_expansion.expanded_form.process_items(datatype_expansion.expanded_form.process_user_facets(datatype_expansion.expanded_form.process_properties.cljs$core$IFn$_invoke$arity$2(l,r),r),r)),cljs.core.cst$kw$type,cljs.core.first(cljs.core.cst$kw$type.cljs$core$IFn$_invoke$arity$1(l)))}var a=datatype_expansion.expanded_form.parse_type_expression($,r);return cljs.core.some_QMARK_(a)?datatype_expansion.utils.clear_node(datatype_expansion.expanded_form.process_constraints(e(a,r),s)):datatype_expansion.utils.error([cljs.core.str("Unknown type "),cljs.core.str($),cljs.core.str(" in "),cljs.core.str(r)].join(""))},datatype_expansion.expanded_form.add_fixpoints=function e(c,r,s){if(cljs.core.map_QMARK_(c)&&cljs.core.some_QMARK_(cljs.core.cst$kw$$ref.cljs$core$IFn$_invoke$arity$1(c))){var $=cljs.core.cst$kw$$ref.cljs$core$IFn$_invoke$arity$1(c),o=cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(c,cljs.core.cst$kw$$ref),n=e(o,r,s);return cljs.core.some_QMARK_(cljs.core.get.cljs$core$IFn$_invoke$arity$2(r,$))?new cljs.core.PersistentArrayMap(null,2,[cljs.core.cst$kw$type,cljs.core.cst$kw$fixpoint,cljs.core.cst$kw$value,n],null):n}return cljs.core.map_QMARK_(c)&&cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$type.cljs$core$IFn$_invoke$arity$1(c),cljs.core.cst$kw$$recur)?(cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(s,cljs.core.inc),c):cljs.core.map_QMARK_(c)?cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(function(c){var $=c,o=cljs.core.nth.cljs$core$IFn$_invoke$arity$3($,0,null),n=cljs.core.nth.cljs$core$IFn$_invoke$arity$3($,1,null);return new cljs.core.PersistentVector(null,2,5,cljs.core.PersistentVector.EMPTY_NODE,[o,e(n,r,s)],null)},c)):cljs.core.coll_QMARK_(c)?cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(function(c){return e(c,r,s)},c):c},datatype_expansion.expanded_form.expanded_form=function(e,c){if(null==e)throw Error("Cannot expand nil node");var r=datatype_expansion.expanded_form.setup_context(c),s=cljs.core.ffirst(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(function(c){return function(c){var r=c,s=(cljs.core.nth.cljs$core$IFn$_invoke$arity$3(r,0,null),cljs.core.nth.cljs$core$IFn$_invoke$arity$3(r,1,null));return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(s,e)}}(r),r)),$=cljs.core.some_QMARK_(s)?new cljs.core.PersistentVector(null,1,5,cljs.core.PersistentVector.EMPTY_NODE,[s],null):cljs.core.PersistentVector.EMPTY,o=cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(r,cljs.core.cst$kw$path,$),n=datatype_expansion.expanded_form.expanded_form_inner(e,o),t=cljs.core.some_QMARK_(s)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(n,cljs.core.cst$kw$$ref,s):n,l=cljs.core.atom.cljs$core$IFn$_invoke$arity$1?cljs.core.atom.cljs$core$IFn$_invoke$arity$1(0):cljs.core.atom.call(null,0),a=datatype_expansion.expanded_form.add_fixpoints(t,function(){var e=cljs.core.cst$kw$fixpoints.cljs$core$IFn$_invoke$arity$1(o);return cljs.core.deref.cljs$core$IFn$_invoke$arity$1?cljs.core.deref.cljs$core$IFn$_invoke$arity$1(e):cljs.core.deref.call(null,e)}(),l);return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.deref.cljs$core$IFn$_invoke$arity$1?cljs.core.deref.cljs$core$IFn$_invoke$arity$1(l):cljs.core.deref.call(null,l),cljs.core.count(function(){var e=cljs.core.cst$kw$fixpoints.cljs$core$IFn$_invoke$arity$1(o);return cljs.core.deref.cljs$core$IFn$_invoke$arity$1?cljs.core.deref.cljs$core$IFn$_invoke$arity$1(e):cljs.core.deref.call(null,e)}()))?a:new cljs.core.PersistentArrayMap(null,2,[cljs.core.cst$kw$type,cljs.core.cst$kw$fixpoint,cljs.core.cst$kw$value,a],null)};