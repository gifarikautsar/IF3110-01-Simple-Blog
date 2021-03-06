function Delete(id_post){
	var conf = confirm("Apakah Anda yakin menghapus post ini?");
	if(conf){
	  window.location.href= 'delete.php?id_post=' + id_post;
	}
	else{
	  window.location="index.php"
	}
}

function Validation(form){
	var judul = form.Judul.value;
	var tanggal = form.Tanggal.value;
	var konten = form.Konten.value;
	if (judul.length == 0 || tanggal.length == 0 || konten.length == 0){
		alert("Form tidak boleh kosong");
		return false;
	}
	else if (!ValidDate(tanggal)){
		return false;
	}
	else{
		return true;
	}
}

function ValidDate(tanggal){
	var pattern = /[0-9]{1,4}-[0-9]{1,2}-[0-9]{1,2}/g;
	var result = pattern.test(tanggal);
	if (!result){
		alert ("Format tanggal tidak sesuai (YYYY-MM-DD)");
		return false;
	}
	else{					// validasi tanggal lebih dari sama dengan tanggal posts
		var now = new Date();
		var date_now = parseInt(now.getDate());
		var month_now = parseInt(now.getMonth()) + 1;
		var year_now = parseInt(now.getFullYear());
		
		//memisahkan tanggal
		var date_pattern = /[0-9]{1,2}$/g;
		var date = tanggal.match(date_pattern);
		
		//memisahkan bulan
		var monthstrip_pattern = /-[0-9]{1,2}-/g;
		var monthstrip = tanggal.match(monthstrip_pattern);
		
		var getmonth = "" + monthstrip;
		var month_pattern = /[0-9]{1,2}/g;
		var month = getmonth.match(month_pattern);
		
		//memisahkan tahun
		var year_pattern = /^[0-9]{1,4}/g;
		var year = tanggal.match(year_pattern);
		
		if(IsDateValid(date,month,year)){
			if (year > year_now){
				return true;
			}
			else{
				if (month > month_now && year == year_now){
					return true;
				}
				else{
					if(date >= date_now && month == month_now && year == year_now){
						return true;
					}
					else{
						alert ("Tanggal harus lebih besar atau sama dengan tanggal saat ini. Tanggal saat ini: "+ year_now + "-" + month_now + "-" + date_now);
						return false;
					}
				}
			}
		}
		else{
			alert ("Tanggal yang dimasukan salah");
			return false;
		}
	}
}

function IsDateValid(date,month,year){
	if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12){
		return ((date >= 1) && (date <= 31));
	}
	else if (month == 4 || month == 6 || month == 9 || month == 11){
		return ((date >= 1) && (date <= 30));
	}
	else if(month == 2){
		if(IsKabisat(year)){
			return ((date >= 1) && (date <= 29));
		}
		else{
			return ((date >= 1) && (date <= 28));
		}
	}
	else{
		return false;
	}
}

function IsKabisat(year){
    return ((year % 400 == 0) || (year % 4 == 0 && year % 100 != 0));
}

function isEmailValid(email){
	var pattern = /^[_A-Za-z0-9-]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]+)$/g;
	var result = pattern.test(email);
	if(result){
		return true;
	}
	else{
		alert ("Email tidak valid");
		return false;
	}
}

function Comment(id_post) { 
	var xmlHttpObj;
	if (window.XMLHttpRequest) {
		xmlHttpObj = new XMLHttpRequest( );
	} 
	else {
		try {
			xmlHttpObj = new ActiveXObject("Msxml2.XMLHTTP");
		} 
		catch (e) {
			try {
				xmlHttpObj = new ActiveXObject("Microsoft.XMLHTTP");
			} 
			catch (e) {
				xmlHttpObj = false;
			}
		}
	}
	var nama = document.getElementById('Nama').value;
	var email = document.getElementById('Email').value;
	var komentar = document.getElementById('Komentar').value;
	if(nama.length !=0 && email.length !=0 && komentar.length !=0){
		if(isEmailValid(email)){
			xmlHttpObj.open("GET","commentdb.php?nama="+nama+"&email="+email+"&komentar="+komentar+"&id_post="+id_post,true);
			//LoadCommentAjax(id_post);
			xmlHttpObj.send();
			xmlHttpObj.onreadystatechange= function(){
				if(xmlHttpObj.readyState==4 && xmlHttpObj.status==200){
					document.getElementById("comments").innerHTML=xmlHttpObj.responseText;
				}
			}
			document.getElementById('Nama').value = "";
			document.getElementById('Email').value = "";
			document.getElementById('Komentar').value = "";
		}
	}
	else{
		alert ("Form tidak boleh ada yang kosong");
	}
}

function LoadCommentAjax(id_post){
	var xmlHttpObj;
	if (window.XMLHttpRequest) {
		xmlHttpObj = new XMLHttpRequest( );
	} 
	else {
		try {
			xmlHttpObj = new ActiveXObject("Msxml2.XMLHTTP");
		} 
		catch (e) {
			try {
				xmlHttpObj = new ActiveXObject("Microsoft.XMLHTTP");
			} 
			catch (e) {
				xmlHttpObj = false;
			}
		}
	}
	xmlHttpObj.open("GET","loadcomment.php?id_post=" + id_post,true);
	xmlHttpObj.send();
	xmlHttpObj.onreadystatechange= function(){
		if(xmlHttpObj.readyState==4 && xmlHttpObj.status==200){
			document.getElementById("comments").innerHTML=xmlHttpObj.responseText;
		}
	}
}