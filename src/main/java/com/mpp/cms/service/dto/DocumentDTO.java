package com.mpp.cms.service.dto;


import com.mpp.cms.domain.Document;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Document entity.
 */
public class DocumentDTO implements Serializable {

    private Long id;

    @NotNull
    private String url;

    @NotNull
    private String name;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public DocumentDTO() {
    }

    public DocumentDTO(Document document) {
        this.id = document.getId();
        this.url = document.getUrl();
        this.name = document.getName();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DocumentDTO documentDTO = (DocumentDTO) o;
        if(documentDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), documentDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DocumentDTO{" +
            "id=" + getId() +
            ", url='" + getUrl() + "'" +
            ", name='" + getName() + "'" +
            "}";
    }
}
