$(document).ready(function(){
		todoList();
		noteList();

		$('#createTodo').click(function(){
			var todoAdd	= $("#todoAdd").val();

			$.ajax({
                url: "backend/addTodo.php",
                type: "POST",
                data: "todoAdd="+todoAdd,
                dataType: "json",
                success:function(data) {
		            todoList();
		            $('#messageList').append("<li>"+data+"</li>");
		           showMessage();
		        },
		        error: function (request, status, error) {
			        alert(request.responseText);
			    }
			});

		});

		$('#createNote').click(function(){
			var noteTitle	= $("#noteAdd").val();
			var context 	=$("#context").val();

			$.ajax({
                url: "backend/addNote.php",
                type: "POST",
                data: "noteTitle="+noteTitle+"&context="+context,
                dataType: "json",
                success:function(data) {
		            noteList();
		             $('#messageList').append("<li>"+data+"</li>");
		           showMessage();
		        },
		        error: function (request, status, error) {
			        alert(request.responseText);
			    }
			});

		});

		$(document).on('click', ".noteTitle", function(){ 
		   var thisNote= $(this).parent().find("textarea");
		   thisNote.is(":hidden") ? thisNote.show() :thisNote.hide();
		});

	});
	function todoList(){
		$("#todoList").html("");
		$.ajax({
                url: "backend/todoList.php",
                dataType: "json",
                success:function(data) {
		            for(var i =0; i<data.length ;i++){
		            	var markClass;

		            	data[i]['mark'] == 1 ? markClass='glyphicon glyphicon-ok' : markClass='glyphicon glyphicon-remove';

		            	var markup = 
		            	"<tr><td colspan='4'>"+data[i]['todo']+"</td></td>\
		            	<td><span class='"+ markClass +"' onClick=Update(this,"+data[i]['id']+") val="+data[i]['mark']+"></span></td>\
		            	<td><span class='glyphicon glyphicon-trash' onClick=deleteTodo("+data[i]['id']+")></span></td></tr>";

		            	$("#todoList").append(markup);
		            }
		        },
		        error: function (request, status, error) {
			        alert(request.responseText);
			    }
			});
	}

	function noteList(){
		$("#noteList").html("");
		$.ajax({
                url: "backend/noteList.php",
                dataType: "json",
                success:function(data) {
		            for(var i =0; i<data.length ;i++){
		            	var markClass;

		            	var markup = 
		            	"<div class='noteRow'>\
		            	<span class='noteTitle'>"+data[i]['title']+"</span>\
		            	<div class='noteIcon'><span class='glyphicon glyphicon-edit' onClick=Edit(this,"+data[i]['id']+")></span>\
		            	<span class='glyphicon glyphicon-trash' onClick=deleteNote("+data[i]['id']+")></span></div><br/>\
		            	<textarea style='display:none' class='disabled' style='width:100%' readonly>"+data[i]['context']+"</textarea>\
		            	<div class='updateNote' style='display:none'></div>\
		            	</div>";



		            	$("#noteList").append(markup);
		            	
		            }
		        },
		        error: function (request, status, error) {
			        alert(request.responseText);
			    }
			});
	}

	function Update(elem,todoID){
		event.preventDefault();

		var mark=$(elem).attr('val');
		var update ;
		mark ==0 ? update=1 :update=0;

		$.ajax({
                url: "backend/updateTodo.php",
                type: "POST",
                data: "update="+update+"&todoID="+todoID,
                dataType: "json",
                success:function(data) {
		            todoList();
		            $('#messageList').append("<li>"+data+"</li>");
		           showMessage();
		        },
		        error: function (request, status, error) {
			        alert(request.responseText);
			    }
			});
	}

	function deleteTodo(todoID){
		event.preventDefault();

		$.ajax({
                url: "backend/deleteTodo.php",
                type: "POST",
                data: "todoID="+todoID,
                dataType: "json",
                success:function(data) {
		            todoList();
		            $('#messageList').append("<li>"+data+"</li>");
		           showMessage();
		        },
		        error: function (request, status, error) {
			        alert(request.responseText);
			    }
			});
	}
	function Edit(elem,noteID){
		cancelNote();
		 var thisNote= $(elem).parent().parent().find("textarea");
		   thisNote.show();

		var updateNoteArea= $(elem).parent().parent().find(".updateNote");
		var thisTile =$(elem).parent().parent().find(".noteTitle").text();
		var thisContext =thisNote.text();

		var markup = 
            	"<div style='width:80%'>\
            	<input type='text' name='updateTitle' value='"+thisTile+"'  style='width:100%'/>\
            	<textarea name='updateContext' style='width:100%'>"+thisContext+"</textarea><br/>\
            	<button onClick='updateNote(this,"+noteID+")'>Save</button>\
            	<button onClick='cancelNote(this)'>Cancel</button>\
            	</div>";

         updateNoteArea.show();
    	updateNoteArea.append(markup);
	}

	function updateNote(elem,noteID){
		var UpdateElems = $(elem).parent();
		var updateTile =UpdateElems.find("input[name='updateTitle']").val();
		var updateContext =UpdateElems.find("textarea[name='updateContext']").val();

		$.ajax({
                url: "backend/updateNote.php",
                type: "POST",
                data: "title="+updateTile+"&context="+updateContext+"&noteID="+noteID,
                dataType: "json",
                success:function(data) {
		            noteList();
		            $('#messageList').append("<li>"+data+"</li>");
		           showMessage();
		        },
		        error: function (request, status, error) {
			        alert(request.responseText);
			    }
		});

	}

	function cancelNote(){
		$('textarea[readonly]').hide();
		$(".updateNote").html('');
	}

	function deleteNote(noteId){
		event.preventDefault();

		$.ajax({
                url: "backend/deleteNote.php",
                type: "POST",
                data: "noteId="+noteId,
                dataType: "json",
                success:function(data) {
		            noteList();
		            $('#messageList').append("<li>"+data+"</li>");
		           showMessage();
		        },
		        error: function (request, status, error) {
			        alert(request.responseText);
			    }
			});
	}

	function showMessage(){
		var listNum = $("#messageList li").length;
		for(var i=0;i<listNum;i++){
			$.when($( "#messageList li:last" ).fadeTo( 4500,0))
	        	.done(function() {
			    $(this).remove();
			});
		}
 		
	}