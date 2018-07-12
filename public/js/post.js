function Post() {
	function bindEvent() {
		$(".post_edit").click(function(e) {
			let params = {
				id: $(".id").val(),
				title: $(".title").val(),
				content: tinymce.get("content").getContent(),
				author: $(".author").val()
			}

			//Đường link localhost

			const url =
				location.protocol +
				"//" +
				document.domain +
				":" +
				location.port +
				"/admin/post/edit"

			$.ajax({
				url: url,
				type: "PUT",
				data: params,
				dataType: "json",
				success: function(res) {
					if (res && res.status_code == 200) {
						location.reload()
					}
				},
				error: function(request, msg, error) {
					if (res && res.status_code == 500) {
						alert(`error = ${JSON.stringify(error)}`)
					}
				}
			})
		})

		$(".post_delete").click(function(e) {
			//Lấy số id của post
			let post_id = $(this).attr("post_id")

			//Đường link localhost
			let baseUrl =
				location.protocol + "//" + document.domain + ":" + location.port

			$.ajax({
				url: baseUrl + "/admin/post/delete",
				type: "DELETE",
				data: { id: post_id },
				dataType: "json",
				success: function(res) {
					if (res && res.status_code == 200) {
						location.reload()
					}
				},
				error: function(request, msg, error) {
					if (res && res.status_code == 404) {
						alert(`error = ${JSON.stringify(error)}`)
					}
				}
			})
		})
	}
	bindEvent()
}

$(document).ready(() => {
	new Post()
})